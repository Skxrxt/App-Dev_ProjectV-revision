import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  StudentArray : any[] = [];
  students: any[] = [];
  searchSurvey: string = '';
  selectedCourse: string = 'ALL CATEGORIES';
  selectedStudent: any = {};
  showEditModal: boolean = false;
  showAddModal: boolean = false;
  newStudents: any[] = [{ student_name: '', email: '', Course: '', contact: '' }];
  graph: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchStudents();
    this.initCharts();
  }
  
  private initCharts(): void {
   
    const data1 = [{
      values: [10, 20, 30, 40], // example values
      labels: ['BSCS', 'BSIT', 'BSEMC', 'ACT'], // example labels
      type: 'pie' as 'pie', // explicitly setting the type as 'pie'
      hole: .4,
    }];
    const barData = [{
      x: ['Responded', 'Pending'], // Example categories
      y: [20, 14], // Example values
      type: 'bar' as 'bar'
    }];

    const layout = {
      height: 350, // Increased height
      width: 500, // Increased width
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
      title:"World Wide Wine Production"
    };
    const barlayout = {
      height: 350, // Increased height
      width: 500, // Increased width
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
      title:"World Wide Wine Production"
    };

    Plotly.newPlot('pieChart1', data1, layout);
    Plotly.newPlot('barChart1', barData, barlayout);
  }

  fetchStudents() {
    this.http.get('http://localhost:7000/api/alumni_list').subscribe(
      (response: any) => {
        this.students = response.data;
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  get filteredStudents() {
    return this.students.filter(student => 
      (this.selectedCourse === 'ALL CATEGORIES' || student.Course === this.selectedCourse) &&
      student.student_name.toLowerCase().includes(this.searchSurvey.toLowerCase())
    );
  }

  editStudent(student: any) {
    this.selectedStudent = {...student};
    this.showEditModal = true;
  }

  updateStudent() {
    if (this.selectedStudent && this.selectedStudent.id) {
      this.http.put(`http://localhost:7000/api/alumni_list/update/${this.selectedStudent.id}`, this.selectedStudent)
        .subscribe({
          next: (response) => {
            console.log('Student updated successfully', response);
            this.showEditModal = false;
            this.fetchStudents(); // Refresh the list to show the updated data
          },
          error: (error) => {
            console.error('Error updating student', error);
          }
        });
    }
  }

  deleteStudent(student: any) {
    if (confirm("Are you sure you want to delete this student?")) {
      this.http.delete(`http://localhost:7000/api/alumni_list/delete/${student.id}`)
        .subscribe((resultData: any) => {
          console.log(resultData);
          alert("Student Deleted");
          this.fetchStudents(); // Refresh student list after deletion
        }, error => {
          console.error('Error deleting student:', error);
          alert("Error deleting student. Please try again.");
        });
    }
  }

  closeModal(event: MouseEvent) {
    const modalContent = (event.target as HTMLElement).closest('.modal-content');
    if (!modalContent) {
      this.showEditModal = false;
    }
  }
}
