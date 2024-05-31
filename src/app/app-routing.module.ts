import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThankYouComponent } from './thank-you/thank-you.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './users/login/login.component';
import { CreateuserComponent } from './users/login/createuser/createuser.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SurveyComponent } from './mainpage/survey/survey.component';
import { FormComponent } from './mainpage/survey/createsurvey/form.component';
import { QuestionoptionsComponent } from './mainpage/survey/createsurvey/createquestions/questionoptions.component';
import { EditsurveyComponent } from './mainpage/survey/editsurvey/editsurvey.component';
import { TabulatesurveyComponent } from './tabulatesurvey/tabulatesurvey.component';
import { ResponsesurveyComponent } from './responsesurvey/responsesurvey.component';
import { RespondentDataComponent } from './respondent-data/respondent-data.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'register', component: CreateuserComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] },
  { path: 'formSurvey', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'questionoption/:idSurvey', component: QuestionoptionsComponent, canActivate: [AuthGuard] },
  { path: 'editsurvey/:idSurvey', component: EditsurveyComponent, canActivate: [AuthGuard] },
  { path: 'tabulatesurvey/:codeSurvey', component: TabulatesurveyComponent, canActivate: [AuthGuard] },
  { path: 'surveyresponse/:codeSurvey', component: ResponsesurveyComponent },
  { path: 'respondent-data', component: RespondentDataComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'student-list', component: StudentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
