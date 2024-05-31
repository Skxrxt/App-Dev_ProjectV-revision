import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { CreateuserComponent } from './users/login/createuser/createuser.component';
import { LoginService } from './users/login/login.service';
import { CreateuserService } from './users/login/createuser/createuser.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SurveyComponent } from './mainpage/survey/survey.component';
import { AuthGuard } from './auth/auth.guard';
import { FormComponent } from './mainpage/survey/createsurvey/form.component';
import { QuestionoptionsComponent } from './mainpage/survey/createsurvey/createquestions/questionoptions.component';
import { EditsurveyComponent } from './mainpage/survey/editsurvey/editsurvey.component';
import { ResponsesurveyComponent } from './responsesurvey/responsesurvey.component';
import { TabulatesurveyComponent } from './tabulatesurvey/tabulatesurvey.component';
import { RespondentDataComponent } from './respondent-data/respondent-data.component';
import { UserService } from './services/user.service';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { StudentListComponent } from './student-list/student-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateuserComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    ProfileComponent,
    SurveyComponent,
    FormComponent,
    QuestionoptionsComponent,
    EditsurveyComponent,
    ResponsesurveyComponent,
    TabulatesurveyComponent,
    RespondentDataComponent,
    ThankYouComponent,
    DashboardComponent,
    AnalyticsComponent,
    StudentListComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MainpageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: CreateuserComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      {path: 'survey', component: SurveyComponent, canActivate: [AuthGuard]},
      {path: 'formSurvey', component: FormComponent, canActivate: [AuthGuard]},
      {path: 'questionoption/:idSurvey', component: QuestionoptionsComponent, canActivate: [AuthGuard]},
      {path: 'editsurvey/:idSurvey', component: EditsurveyComponent, canActivate: [AuthGuard]},
      {path: 'tabulatesurvey/:codeSurvey', component: TabulatesurveyComponent, canActivate: [AuthGuard]},
      {path: 'surveyresponse', component: ResponsesurveyComponent}      
    ]),
    NgChartsModule
  ],
  
  providers: [LoginService, CreateuserService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
