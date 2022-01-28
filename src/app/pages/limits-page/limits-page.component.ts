import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DgAddLimitComponent } from 'src/app/dialogs/dg-add-limit/dg-add-limit.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-limits-page',
  templateUrl: './limits-page.component.html',
  styleUrls: ['./limits-page.component.css']
})
export class LimitsPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private RequestService: RequestService,
    private decimalPipe:DecimalPipe,
    private snack:MatSnackBar,
    private activatedRoute: ActivatedRoute) { }
 
  user:any;
  idUser:any;
  actualYear:number;
  displayedColumns: string[] = [ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
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

  ];
  years:any[]=[]
  yearSelected:number;
  data:any;
  amountLimits:any;
  actualMonth:any;
  idExpense:any;
  limits:any;
  idLimit:number;
  ngOnInit(): void {
    this.idExpense=this.activatedRoute.snapshot.params.id
    this.actualYear = new Date().getFullYear();
    this.actualMonth=new Date().getMonth();
    this.yearSelected=this.actualYear;
    this.calculatorYears();
    this.loadDataUser();
    this.loadLimitsExpense()
    
  }
  calculatorYears(){
    var year=this.actualYear
    while(year>=2020){
      this.years.push(year);
      year--;
    }
  }
  loadDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  filterBy(option){
    this.yearSelected=option;
    this.loadLimitsExpense();
  }
  loadLimitsExpense(){
    this.RequestService.get("api/limit/getByAccount/"+this.idExpense+"/"+this.yearSelected).subscribe(r=>{
      this.limits=r;
      this.makeDataSource()
    })
  }
  makeDataSource(){
    var row={};var data=[]
    var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    //this.actualMonth=months[this.actualMonth]
    for(var i=0;i<12;i++){
      row=Object.assign(row,row[months[i]]="No asignado")
    }
    this.limits.map(limit=>{
      row=Object.assign(row,{[limit.month]:this.decimalPipe.transform(limit.limit,'.2-5')})
    })
    data.push(row)
    this.dataSource.data=data
  }
  openLimit(month){
    this.limits.map(limit=>{
      if(limit.month==month){
        this.idLimit=limit.id
      }
    })
    var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    var idMonth:number;
    for(var i=0;i<12;i++){
      if(months[i]==month){
        idMonth=i
      }
    }
    if(idMonth>=this.actualMonth && this.actualYear==this.yearSelected){
      this.dialog.open(DgAddLimitComponent,{
        width: '70%',
        data:{
          user:this.user,
          idExpense:this.idExpense,
          idLimit:this.idLimit,
          month:month,
          year:this.yearSelected,
          limit:this.dataSource.data[0][month]=="No asignado"?null:this.dataSource.data[0][month],
          transform:this.dataSource.data[0][month]=="No asignado"? "register":"edit",
        }
      });
    }else{
      this.snack.open('No se puede actualizar limites anteriores a la fecha.','CERRAR',{duration:5000,panelClass:'snackError',})
    }
    
  }
  getNameAction(name){
    return this.dataSource.data[0]?.[name]=="No asignado"? " Añadir":" Editar";
  }
  getNameIcon(name){
    return this.dataSource.data[0]?.[name]=="No asignado"? "add":"edit";
  }
  
  
  
}
