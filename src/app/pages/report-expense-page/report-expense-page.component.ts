import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ITable, Item, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RequestService } from 'src/app/services/request.service';
import {DecimalPipe} from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
type TableRow=[any,any,any,any,any,any,any,any,any,any,any,any,any,any]
@Component({
  selector: 'app-report-expense-page',
  templateUrl: './report-expense-page.component.html',
  styleUrls: ['./report-expense-page.component.css'],
  providers:[DatePipe]
})
export class ReportExpensePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private RequestService: RequestService,
    private snack:MatSnackBar,
    private datePipe:DatePipe,
    private decimalPipe:DecimalPipe) { }
 
  usersResponse:any;
  user:any;
  idUser:any;
  userName:any;
  expenses:any;
  allExpenses:any;
  actualYear:number;
  displayedColumns: string[] = [ 'accountName','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre','Totales'];
  displayedColumnsLimit: string[] = [ 'total','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  dataSource =  new MatTableDataSource<any>([]);
  dataSource2 =  new MatTableDataSource<any>([]);
  dataPrint:any[];
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
  amountLimits:any;
  ngOnInit(): void {
    this.actualYear = new Date().getFullYear();
    this.yearSelected=this.actualYear;
    this.calculatorYears();
    this.loadDataUser();
    this.loadExpenseReport()
    
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
    this.loadExpenseReport()
  }
  loadExpenseReport(){
    /* this.amountLimits=[
      {id:1,month:"Enero",year:2022,limit:1500},
      {id:2,month:"Diciembre",year:2021,limit:2500},
      {id:3,month:"Octubre",year:2021,limit:5000}
    ] */
    /* this.dataSource2.data=[
      {total:"Monto limite",Enero:1500,Febrero:0,Marzo:0,Abril:0,Mayo:0,Junio:0,Julio:0,Agosto:0,Septiembre:0,Octubre:0,Noviembre:0,Diciembre:0},
      {total:"total General",Enero:1600,Febrero:0,Marzo:0,Abril:0,Mayo:0,Junio:0,Julio:0,Agosto:0,Septiembre:0,Octubre:0,Noviembre:0,Diciembre:0},
    ] */
    this.RequestService.get('api/limit/getAll/'+this.user.idUser).subscribe(r=>{
      this.amountLimits=r;
    })
    this.RequestService.get('api/expense/expensesReport/'+this.user.idUser+'/'+this.yearSelected).subscribe(r=>{
    this.data=r ; 
    var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    
    var dataConverted=[];
    var dataConverted2=[]
    this.data.map(income=>{
      var amount={}
      var amount2={}
      var account={}
      var account2={}
      var total=0
      account=Object.assign(account,{accountName:income.accountName})
      account2=Object.assign(account2,{accountName:income.accountName})
      for(var i=0;i<12;i++){
        total+=income.amount[i]
        amount[months[i]]=income.amount[i];
        amount2[months[i]]=income.amount[i].toFixed(2)
        account=Object.assign(account,amount);
        account2=Object.assign(account2,amount2)
      }
      account=Object.assign(account,{Totales:total})
      account2=Object.assign(account2,{Totales:total.toFixed(2)})
      dataConverted.push(account)
      dataConverted2.push(account2)
    })
    this.dataSource.data=dataConverted;
    this.dataPrint=dataConverted2
    this.loadLimitChart(this.dataSource.data)
    })
    
  }
  loadLimitChart(data){
    /* limits chart */
    console.log(data)
    var amountLimitsOfYear=[]
    var limit={};var totals={}
    var dataLimits=[]
    var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    limit={total:"Presupuesto"};
    totals={total:"Total Egresos"}
    this.amountLimits.map(a=>{
      if(a.year==this.yearSelected){
        amountLimitsOfYear.push(a)
      }
    })
    for(var i=0;i<12;i++){
      var sum=0
      data.map(d=>{
        sum+=d[months[i]]
      })
      totals=Object.assign(totals,totals[months[i]]=sum)
      amountLimitsOfYear.map(a=>{
        if(months[i]==a.month){
          limit=Object.assign(limit,limit[months[i]]=a.limit)
        }else{
          limit=Object.assign(limit,limit[months[i]]=0)
        }
      })
      
    }
    amountLimitsOfYear.map(a=>{
        limit=Object.assign(limit,limit[a.month]=a.limit)
    })
      dataLimits.push(limit)
      dataLimits.push(totals)
    this.dataSource2.data=dataLimits
  }
  dataForPrint(){
    console.log(this.dataSource.data)
  }
  getTotalCost(field:string) {
    
        return this.decimalPipe.transform(this.dataSource?.data.map(t => t[field]).reduce((acc, value) => acc + value, 0),'.2-5');
  }
  getExcess(field:string) {
    var total=0;var cont=0
    this.dataSource2?.data.map(t => {
      if(cont==0){
        total=t[field];cont++;
      }else{
        total=total-t[field]
      }
    })
    return this.decimalPipe.transform(total,'.2-5')
}
  async printReport(){
    let myDate = new Date();
    let myActualDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
        const pdf=new PdfMakeWrapper();
        pdf.pageMargins([0,20,0,0])
        pdf.pageSize('A4')
        pdf.pageOrientation('landscape')
        pdf.defaultStyle({
          fontSize:11,
        })
       
          pdf.add(new Txt('Fecha de impresion: '+ myActualDate).margin([20,10]).alignment('left').fontSize(10).end);
          pdf.add(new Txt('REPORTE DE EGRESOS').bold().alignment('center').fontSize(13).end);
          pdf.add(new Txt('Gestión '+this.yearSelected).bold().alignment('center').fontSize(12).end);
          pdf.add(pdf.ln(1));
          
            pdf.add(this.createTable(this.dataPrint))
         
           pdf.create().open();
        
    }

    //   


    createTable(data: Item[]):ITable{
      [{}]
      var foot=['Total General',this.getTotalCost('Enero'),this.getTotalCost('Febrero'),this.getTotalCost('Marzo'),this.getTotalCost('Abril'),this.getTotalCost('Mayo'),this.getTotalCost('Junio'),this.getTotalCost('Julio'),this.getTotalCost('Agosto')
      ,this.getTotalCost('Septiembre'),this.getTotalCost('Octubre'),this.getTotalCost('Noviembre'),this.getTotalCost('Diciembre'),this.getTotalCost('Totales')]
        return new Table([
        [ 'CUENTA', 'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE','TOTAL GENERAL'],
        ...this.extractData(data),foot,
      ]).margin([20,10]).alignment('center').fontSize(10).layout({hLineColor:(rowIndex:number,node:any,columnIndex:number)=>{
              return  '#c2c2c2';
      },vLineColor:((rowIndex:number,node:any,columnIndex:number)=>{
          return  '#c2c2c2';
      }),fillColor:((rowIndex:number,node:any,columnIndex:number)=>{
          return  rowIndex===0?'#c2c2c2':'';
      })
      }).end;
    }
  
    extractData(data:any[]):TableRow[]{
        var index=1
        return data.map(row=>[row.accountName,row.Enero,row.Febrero,row.Marzo,row.Abril,row.Mayo,row.Junio,row.Julio,row.Agosto,row.Septiembre,row.Octubre,row.Noviembre,row.Diciembre,row.Totales])
    }
}

