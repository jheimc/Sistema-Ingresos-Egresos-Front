import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DgCreateExpenseAccountComponent } from 'src/app/dialogs/dg-create-expense-account/dg-create-expense-account.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-expense-accounts',
  templateUrl: './expense-accounts.component.html',
  styleUrls: ['./expense-accounts.component.css']
})
export class ExpenseAccountsComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private RequestService: RequestService,
    private snack:MatSnackBar,) { }
 
  usersResponse:any;
  user:any;
  idUser:any;
  userName:any;
  incomes:any;
  privilegios:any;
  displayedColumns: string[] = [ 'expenseName','registrationDate','actions'];
  dataSource =  new MatTableDataSource<any>([]);
  columnas=[
    {titulo:"NOMBRE DE CUENTA" ,name: "expenseName"},
    {titulo:"FECHA DE REGISTRO" ,name: "registrationDate"},

  ];
  

  ngOnInit(): void {
    this.loadDataUser();
    this.loadIncomeAccounts();
    
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadIncomeAccounts(){
    this.RequestService.get('api/expense/allExpenses/'+this.user.idUser).subscribe(r=>{
      this.incomes=r;
      this.dataSource.data=this.incomes;
    })
  }

  openIncome(){
    this.dialog.open(DgCreateExpenseAccountComponent,{
      width: '60%',
      data:{
        user:this.user,
        transform:'register'
      }
    }); 
  }
  openEditExpense(expense){
    this.dialog.open(DgCreateExpenseAccountComponent,{
      width: '60%',
      data:{
        expense:expense,
        transform:'edit',
      }
    });
  }
  deleteExpense(idExpense){
    this.RequestService.put('api/expense/deleteExpense/'+idExpense,{})
    .subscribe({
      error:()=>{
        this.snack.open('Cuenta eliminada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      /* error:()=>{
        this.snack.open('Fallo al eliminar el usuario','CERRAR',{duration:5000})
      } */
    });
  }
}
