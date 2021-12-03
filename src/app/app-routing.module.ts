import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseAccountsComponent } from './pages/expense-accounts/expense-accounts.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IncomeAccountsComponent } from './pages/income-accounts/income-accounts.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { UserGuard } from './security/user.guard';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {path:'home',component:HomePageComponent,canActivate:[UserGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'home/manage-users',component:ManageUserComponent,canActivate:[UserGuard]},
  {path:'home/income-accounts',component:IncomeAccountsComponent,canActivate:[UserGuard]},
  {path:'home/expense-accounts',component:ExpenseAccountsComponent,canActivate:[UserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
