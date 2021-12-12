import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http' 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CookieService } from 'ngx-cookie-service';
import { interceptorProvider, } from './security/jwt-interceptor.interceptor';
import { RequestService } from './services/request.service';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { DgRegisterUserComponent } from './dialogs/dg-register-user/dg-register-user.component';
import { IncomeAccountsComponent } from './pages/income-accounts/income-accounts.component';
import { ExpenseAccountsComponent } from './pages/expense-accounts/expense-accounts.component';
import { DgCreateIncomeAccountComponent } from './dialogs/dg-create-income-account/dg-create-income-account.component';
import { DgCreateExpenseAccountComponent } from './dialogs/dg-create-expense-account/dg-create-expense-account.component';
import { IncomePageComponent } from './pages/income-page/income-page.component';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';
import { DgIncomeComponent } from './dialogs/dg-income/dg-income.component';
import { DgExpenseComponent } from './dialogs/dg-expense/dg-expense.component';
import { ReportIncomePageComponent } from './pages/report-income-page/report-income-page.component';
import { ReportExpensePageComponent } from './pages/report-expense-page/report-expense-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DgUpdateUserComponent } from './dialogs/dg-update-user/dg-update-user.component';
import { DgForgetPasswordComponent } from './dialogs/dg-forget-password/dg-forget-password.component';
import { DgRestartPasswordComponent } from './dialogs/dg-restart-password/dg-restart-password.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DgUpdateWelcomeMessageComponent } from './dialogs/dg-update-welcome-message/dg-update-welcome-message.component';
import { DgUpdateImageComponent } from './dialogs/dg-update-image/dg-update-image.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    NavBarComponent,
    SideBarComponent,
    ManageUserComponent,
    DgRegisterUserComponent,
    IncomeAccountsComponent,
    ExpenseAccountsComponent,
    DgCreateIncomeAccountComponent,
    DgCreateExpenseAccountComponent,
    IncomePageComponent,
    ExpensePageComponent,
    DgIncomeComponent,
    DgExpenseComponent,
    ReportIncomePageComponent,
    ReportExpensePageComponent,
    UserProfilePageComponent,
    DgUpdateUserComponent,
    DgForgetPasswordComponent,
    DgRestartPasswordComponent,
    SettingsComponent,
    DgUpdateWelcomeMessageComponent,
    DgUpdateImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxChartsModule,
    MaterialFileInputModule
  ],
  providers: [CookieService,RequestService,interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
