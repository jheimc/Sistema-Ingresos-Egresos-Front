import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DgCreateIncomeAccountComponent } from 'src/app/dialogs/dg-create-income-account/dg-create-income-account.component';
import { DgIncomeComponent } from 'src/app/dialogs/dg-income/dg-income.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-income-page',
  templateUrl: './income-page.component.html',
  styleUrls: ['./income-page.component.css']
})
export class IncomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private RequestService: RequestService,
    private snack:MatSnackBar,) { }
 
  user:any;
  idUser:any;
  userName:any;
  incomes:any;
  allIncomes:any;
  displayedColumns: string[] = [ 'idIncomeUser','date','month','concept','amount','comment','incomeAccount','actions'];
  dataSource =  new MatTableDataSource<any>([]);
  columnas=[
    {titulo:"N°" ,name: "idIncomeUser"},
    {titulo:"FECHA" ,name: "date"},
    {titulo:"MES",name:"month"},
    {titulo:"CONCEPTO",name:"concept"},

  ];
  

  ngOnInit(): void {
    this.loadDataUser();
    this.loadIncomesByUser();
    this.loadIncomeAccounts();
    
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadIncomeAccounts(){
    this.RequestService.get('http://localhost:8080/api/income/allIncomes/'+this.user.idUser).subscribe(r=>{
      this.incomes=r;
    })
  }
  loadIncomesByUser(){
    this.RequestService.get('http://localhost:8080/api/incomeUser/allIncomesByUser/'+this.user.idUser).subscribe(r=>{
      this.allIncomes=r;
      this.dataSource.data=this.allIncomes;
    })
  }
  openIncome(){
    this.dialog.open(DgIncomeComponent,{
      width: '60%',
      data:{
        user:this.user,
        incomesList:this.incomes,
        transform:"register"
      }
    }); 
  }
  openEditIncome(income){
    this.dialog.open(DgIncomeComponent,{
      width: '60%',
      data:{
        income:income,
        incomesList:this.incomes,
        transform:'edit',
      }
    });
  }
}
