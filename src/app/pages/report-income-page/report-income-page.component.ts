import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-report-income-page',
  templateUrl: './report-income-page.component.html',
  styleUrls: ['./report-income-page.component.css']
})
export class ReportIncomePageComponent implements OnInit {

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
  actualYear:number;
  displayedColumns: string[] = [ 'accountName','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre','Totales'];
  dataSource =  new MatTableDataSource<any>([]);
  columnas=[
    
    {titulo:"ENERO" ,name: "Enero"},
    {titulo:"FEBRERO",name:"Febrero"},
    {titulo:"MARZO",name:"Marzo"},
    {titulo:"ABRIL",name:"Abril"},
    {titulo:"MAYO",name:"Mayo"},
    {titulo:"JUNIO",name:"Junio"},
    {titulo:"JULIO",name:"Julio"},
    {titulo:"AGOSTO",name:"Agosto"},
    {titulo:"SEPTIEMBRE",name:"Septiembre"},
    {titulo:"OCTUBRE",name:"Octubre"},
    {titulo:"NOVIEMBRE",name:"Noviembre"},
    {titulo:"DICIEMBRE",name:"Diciembre"},
    {titulo:"TOTAL GENERAL",name:"Totales"},

  ];
  years:any[]=[]
  yearSelected:number;
  data:any;
  ngOnInit(): void {
    this.actualYear = new Date().getFullYear();
    this.yearSelected=this.actualYear;
    this.calculatorYears();
    this.loadDataUser();
    this.loadIncomesReport()
    
  }
  calculatorYears(){
    var year=this.actualYear
    while(year>=2010){
      this.years.push(year);
      year--;
    }
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  filterBy(option){
    this.yearSelected=option;
    this.loadIncomesReport()
  }
  loadIncomesReport(){
    
    this.RequestService.get('http://localhost:8080/api/income/incomesReport/'+this.user.idUser+'/'+this.yearSelected).subscribe(r=>{
    this.data=r ; 
    var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    
    var dataConverted=[];
    this.data.map(income=>{
      var amount={}
      var account={}
      var total=0
      account=Object.assign(account,{accountName:income.accountName})
      for(var i=0;i<12;i++){
        total+=income.amount[i]
        amount[months[i]]=income.amount[i];
        account=Object.assign(account,amount);
      }
      account=Object.assign(account,{Totales:total})
      dataConverted.push(account)
    })
    this.dataSource.data=dataConverted;
    })
  }
  getTotalCost(field:string) {
    
        return this.dataSource?.data.map(t => t[field]).reduce((acc, value) => acc + value, 0);
  }
}
