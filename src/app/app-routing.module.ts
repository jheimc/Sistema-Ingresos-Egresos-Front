import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseAccountsComponent } from './pages/expense-accounts/expense-accounts.component';
import { ExpensePageComponent } from './pages/expense-page/expense-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IncomeAccountsComponent } from './pages/income-accounts/income-accounts.component';
import { IncomePageComponent } from './pages/income-page/income-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { ReportExpensePageComponent } from './pages/report-expense-page/report-expense-page.component';
import { ReportIncomePageComponent } from './pages/report-income-page/report-income-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserGuard } from './security/user.guard';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {path:'home',component:HomePageComponent,canActivate:[UserGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'home/manage-users',component:ManageUserComponent,canActivate:[UserGuard]},
  {path:'home/income-accounts',component:IncomeAccountsComponent,canActivate:[UserGuard]},
  {path:'home/expense-accounts',component:ExpenseAccountsComponent,canActivate:[UserGuard]},
  {path:'home/incomes',component:IncomePageComponent,canActivate:[UserGuard]},
  {path:'home/expenses',component:ExpensePageComponent,canActivate:[UserGuard]},
  {path:'home/report/expense',component:ReportExpensePageComponent,canActivate:[UserGuard]},
  {path:'home/report/income',component:ReportIncomePageComponent,canActivate:[UserGuard]},
  {path:'home/user',component:UserProfilePageComponent,canActivate:[UserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
