import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { DashboardFeatureComponent } from './dashboard-feature/dashboard-feature.component';
import { EditServiceComponent } from './dashboard-feature/edit-service/edit-service.component';
import { ScheduleComponent } from './dashboard-feature/schedule/schedule.component';
import { LogsComponent } from './dashboard-feature/logs/logs.component';
import { CardComponent } from './dashboard-feature/dashboard/card/card.component';
import { TooltipComponent } from './dashboard-feature/schedule/tooltip/tooltip.component';
import { ErrorPopoverComponent } from './shared/error-popover/error-popover.component';
import { ActionPopoverComponent } from './shared/action-popover/action-popover.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    PasswordRecoveryComponent,
    ChangePasswordComponent,
    DashboardFeatureComponent,
    EditServiceComponent,
    ScheduleComponent,
    LogsComponent,
    CardComponent,
    TooltipComponent,
    ErrorPopoverComponent,
    ActionPopoverComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
