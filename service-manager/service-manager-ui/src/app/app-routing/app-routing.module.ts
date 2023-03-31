import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { PasswordRecoveryComponent } from '../auth/password-recovery/password-recovery.component';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { DashboardComponent } from '../dashboard-feature/dashboard/dashboard.component';
import { EditServiceComponent } from '../dashboard-feature/edit-service/edit-service.component';
import { LogsComponent } from '../dashboard-feature/logs/logs.component';
import { ScheduleComponent } from '../dashboard-feature/schedule/schedule.component';
import { UpcomingComponent } from '../dashboard-feature/logs/upcoming/upcoming.component';
import { HistoryComponent } from '../dashboard-feature/logs/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'edit-service', component: EditServiceComponent },
  {
    path: 'logs',
    component: LogsComponent,
    children: [
      { path: '', redirectTo: 'upcoming', pathMatch: 'full' },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'history', component: HistoryComponent },
    ],
  },
  { path: 'schedule', component: ScheduleComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
