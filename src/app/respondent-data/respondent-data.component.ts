import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { LoginService } from '../users/login/login.service'; // Import LoginService
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';
import * as Plotly from 'plotly.js-dist-min';

interface StudentData {
  id: string;  // Ensure there is an 'id' field
  batchYr: string;
  program: string;
  name: string;
  email: string;
  contact_Num: string;
  work_Status: string;
  occupation: string;
}

@Component({
  selector: 'app-respondent-data',
  templateUrl: './respondent-data.component.html',
  styleUrls: ['./respondent-data.component.css']
})
export class RespondentDataComponent {


  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  employedCount = 0;
  unemployedCount = 0;
  seekingEmploymentCount = 0;

  name: string = "";
  email: string = "";
  contact_Num: string = "";
  program: string = "";
  occupation: string = "";
  civil_Status: string = "";
  sex: string = '';
  work_Status: string = ''; 
  batchYr: string = '';
  salary: string = ''; 
  firstjob_curriculum: string = '';
  work_place: string ='';
  
  currentStudentID = "";
  searchText: string = '';
  searchSurvey: string = ''; 
  selectedCourse: string = 'ALL CATEGORIES'; 
  selectedBatchYr: string = 'ALL YEARS';

  students: any[] = [];  // Initialize the students property with an empty array

  constructor(private http: HttpClient, private userService: UserService, private loginService: LoginService) 
  {
    this.students = [];  // Initialize the students property in the constructor
    this.checkAdminAndGetAllStudents();
   
  }
  
  ngOnInit(): void {
    this.getAllStudent();
    this.initCharts();
  }
  checkAdminAndGetAllStudents() {
    this.loginService.sendAdminStatus(this.userService.getIsAdmin()).subscribe(isAdmin => {
      if (isAdmin) {
        this.getAllStudent();
      } else {
        alert("Access denied. Admin privileges required.");
      }
    });
  }
  private initCharts(): void {
    const xArray = [55, 49, 44, 73];
    const yArray = ["BSCS","BSIT","BSEMC","ACT"];
    const barData1 = [{
      x: xArray,
      y: yArray,
      type: 'bar' as 'bar',
      orientation: "h" as 'h'
    }];
    const data1 = [{
        values: [10, 20, 30], // example values
        labels: ['Employed', 'Unemployed', 'Seeking Employment'], // example labels
        type: 'pie' as 'pie' // explicitly setting the type as 'pie'
    }];

    const layout = {
        height: 400, // Increased height
        width: 400, // Increased width
        font: {
          size: 16 // Increase the font size
        },
        legend: {
          font: {
            size: 8 // Increase the legend font size
          }
        },
        paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background
        plot_bgcolor: 'rgba(0,0,0,0)', // Transparent background
        
    };
    const barlayout = {
      height: 350, // Increased height
      width: 800, // Increased width
      font: {
        size: 16 // Increase the font size
      },
      legend: {
        font: {
          size: 16 // Increase the legend font size
        }
      },
      paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background
      plot_bgcolor: 'rgba(0,0,0,0)', // Transparent background
      title:"Selected Population Sample"
    };

    Plotly.newPlot('barChart1', barData1, barlayout);
    Plotly.newPlot('pieChart1', data1, layout);
  }

  getAllStudent()
  { 
    this.http.get(`http://localhost:7000/api/survey_answers`)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data.map(({ id, batchYr, program, name, email, contact_Num, work_Status, occupation }: StudentData) => ({
          id,
          batchYr,
          program,
          name,
          email,
          contact_Num,
          work_Status,
          occupation
        }));
        this.updateEmploymentCounts(this.StudentArray);  // Update counts after fetching
      });
  }
  
  updateEmploymentCounts(students: any[]) {
    this.employedCount = 0;
    this.unemployedCount = 0;
    this.seekingEmploymentCount = 0;

    students.forEach(student => {
      const firstChar = student.work_Status[0].toLowerCase(); // Get the first character and convert to lowercase
      switch (firstChar) {
        case 'e':
          this.employedCount++;
          break;
        case 'u':
          this.unemployedCount++;
          break;
        case 's':
          this.seekingEmploymentCount++;
          break;
      }
    });
  }

get filteredStudents() {
  const filtered = this.StudentArray.filter(student => {
    return (this.selectedCourse === 'ALL CATEGORIES' || student.program === this.selectedCourse) &&
           (this.selectedBatchYr === 'ALL YEARS' || student.batchYr === parseInt(this.selectedBatchYr)) &&
           student.name.toLowerCase().split(' ').some((word: string) => 
           word.startsWith(this.searchSurvey.toLowerCase()));
  });
  this.updateEmploymentCounts(filtered);  // Update counts based on filtered data
  return filtered;
}

  register()
  {
   
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "contact_Num": this.contact_Num,
      "program" : this.program,
      "work_Status" : this.work_Status,
      "occupation" : this.occupation,
      "batchYr" : this.batchYr
    };
    this.http.post("http://localhost:7000/api/survey_answers/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllStudent();
    
    });
  }
  setUpdate(data: any) 
  {
    this.name = data.name;
    this.email = data.email;
    this.contact_Num = data.contact_Num;
    this.program = data.program;
    this.work_Status = data.work_Status;
    this.batchYr = data.batchYr;
    this.occupation = data.occupation;
    this.currentStudentID = data.id;
 
  }
  UpdateRecords() {
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "contact_Num": this.contact_Num,
      "program" : this.program,
      "work_Status" : this.work_Status,
      "occupation" : this.occupation,
      "batchYr" : this.batchYr
    };
    
    this.http.put("http://localhost:7000/api/survey_answers/update/" + this.currentStudentID, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Student Updated");
        this.getAllStudent(); // Refresh student list
      }, error => {
        console.error('Error updating student:', error);
        alert("Error updating student. Please try again.");
      });
  }
  
 
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
  setDelete(studentItem: any) {
    if (confirm("Are you sure you want to delete this student?")) {
      this.http.delete(`http://localhost:7000/api/survey_answers/delete/${studentItem.id}`)
        .subscribe((resultData: any) => {
          console.log(resultData);
          alert("Student Deleted");
          this.getAllStudent(); // Refresh student list after deletion
        }, error => {
          console.error('Error deleting student:', error);
          alert("Error deleting student. Please try again.");
        });
    }
  }

  downloadExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredStudents);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');

    XLSX.writeFile(wb, 'students.xlsx');
  }
  
}

