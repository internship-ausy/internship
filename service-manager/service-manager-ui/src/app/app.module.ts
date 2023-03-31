import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
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
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard-feature/dashboard/dashboard.component';
import { HistoryComponent } from './dashboard-feature/logs/history/history.component';
import { UpcomingComponent } from './dashboard-feature/logs/upcoming/upcoming.component';

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
    DashboardComponent,
    EditServiceComponent,
    ScheduleComponent,
    LogsComponent,
    CardComponent,
    TooltipComponent,
    ErrorPopoverComponent,
    ActionPopoverComponent,
    HistoryComponent,
    UpcomingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
