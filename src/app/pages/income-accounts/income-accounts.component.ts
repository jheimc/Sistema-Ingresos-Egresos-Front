import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DgCreateIncomeAccountComponent } from 'src/app/dialogs/dg-create-income-account/dg-create-income-account.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-income-accounts',
  templateUrl: './income-accounts.component.html',
  styleUrls: ['./income-accounts.component.css']
})
export class IncomeAccountsComponent implements OnInit {

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
  displayedColumns: string[] = [ 'incomeName','registrationDate','actions'];
  dataSource =  new MatTableDataSource<any>([]);
  columnas=[
    {titulo:"NOMBRE DE CUENTA" ,name: "incomeName"},
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
    this.RequestService.get('http://localhost:8080/api/income/allIncomes/'+this.user.idUser).subscribe(r=>{
      this.incomes=r;
      this.dataSource.data=this.incomes;
    })
  }

  openIncome(){
    this.dialog.open(DgCreateIncomeAccountComponent,{
      width: '60%',
      data:{
        user:this.user,
      }
    }); 
  }
}