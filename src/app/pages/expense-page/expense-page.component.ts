import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DgExpenseComponent } from 'src/app/dialogs/dg-expense/dg-expense.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css']
})
export class ExpensePageComponent implements OnInit {

 
  constructor(
    public dialog: MatDialog, 
    private RequestService: RequestService,
    private snack:MatSnackBar,) { }
 
  usersResponse:any;
  user:any;
  idUser:any;
  userName:any;
  expenses:any;
  allExpenses:any;
  displayedColumns: string[] = [ 'idExpenseUser','date','month','concept','amount','comment','expenseAccount','actions'];
  dataSource =  new MatTableDataSource<any>([]);
  columnas=[
    {titulo:"N°" ,name: "idExpenseUser"},
    {titulo:"FECHA" ,name: "date"},
    {titulo:"MES",name:"month"},
    {titulo:"CONCEPTO",name:"concept"},

  ];
  

  ngOnInit(): void {
    this.loadDataUser();
    this.loadExpenseByUser();
    this.loadExpenseAccounts();
    
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadExpenseAccounts(){
    this.RequestService.get('api/expense/allExpenses/'+this.user.idUser).subscribe(r=>{
      this.expenses=r;
    })
  }
  loadExpenseByUser(){
    this.RequestService.get('api/expenseUser/allExpesesByUser/'+this.user.idUser).subscribe(r=>{
      this.allExpenses=r;
      this.dataSource.data=this.allExpenses;
    })
  }
  openExpense(){
    this.dialog.open(DgExpenseComponent,{
      width: '60%',
      data:{
        user:this.user,
        expensesList:this.expenses,
        transform:"register",
        allExpenses:this.allExpenses
      }
    }); 
  }
  openEditExpense(expense){
    this.dialog.open(DgExpenseComponent,{
      width: '60%',
      maxHeight:'95%',
      height:'95%',
      data:{
        user:this.user,
        expense:expense,
        expensesList:this.expenses,
        transform:'edit',
        allExpenses:this.allExpenses
      }
    });
  }
}
