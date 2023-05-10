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
import { AuthGuard } from '../auth/auth.guard';
import { AddServiceComponent } from '../dashboard-feature/add-service/add-service.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-service',
    component: AddServiceComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'add-service/:date/:hour/:ws',
    component: AddServiceComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'edit-service/:id',
    component: EditServiceComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'upcoming', pathMatch: 'full' },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'history', component: HistoryComponent },
    ],
  },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
