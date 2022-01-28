import { Component, enableProdMode, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';
import { DgAddLimitComponent } from '../dg-add-limit/dg-add-limit.component';

@Component({
  selector: 'app-dg-expense',
  templateUrl: './dg-expense.component.html',
  styleUrls: ['./dg-expense.component.css']
})
export class DgExpenseComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<DgExpenseComponent>,
  ) { }
    transform:any;
    expenses:any;
    expense:any;
    user:any;
    limitStatus:boolean=false;
    limit:number;
    totalMonth:number;
    idLimit:number;
    month:any;
    months:any[]=[
    {name:"Enero"},
    {name:"Febrero"},
    {name:"Marzo"},
    {name:"Abril"},
    {name:"Mayo"},
    {name:"Junio"},
    {name:"Julio"},
    {name:"Agosto"},
    {name:"Septiembre"},
    {name:"Octubre"},
    {name:"Noviembre"},
    {name:"Diciembre"},
  ]
  /* amountLimits=[
    {id:1,month:"Enero",year:2022,limit:1500},
    {id:2,month:"Diciembre",year:2021,limit:2500},
    {id:3,month:"Octubre",year:2021,limit:5000}] */
    amountLimits:any;
  registerExpense= this.formBuilder.group({
    date:['',[Validators.required]],
    month:['',Validators.required],
    concept:['',[Validators.required]],
    amount:['',[Validators.required]],
    comment:['',[Validators.required]],
    idExpense:['',[Validators.required]],

  });
  editExpense = this.formBuilder.group({
    date:['',[Validators.required]],
    month:['',[Validators.required]],
    concept:['',[Validators.required]],
    amount:['',[Validators.required]],
    comment:['',[Validators.required]],
    idExpense:['',[]],
  })
  ngOnInit(): void {
    
    this.transform=this.data.transform;
    this.expenses=this.data.expensesList;
    this.user=this.data.user
    this.loadLimitsData()
    if(this.transform=='edit'){
      this.expense=this.data.expense;
      this.editExpense.get('date').setValue(this.expense?.date);
      this.editExpense.controls['month'].setValue(this.expense?.month);
      this.editExpense.controls['concept'].setValue(this.expense?.concept);
      this.editExpense.controls['amount'].setValue(this.expense?.amount);
      this.editExpense.controls['comment'].setValue(this.expense?.comment);

    }
  }
  loadLimitsData(){
    this.RequestService.get('api/limit/getAll/'+this.user.idUser).subscribe(r=>{
      this.amountLimits=r;
    })
  }
  fillDecimals(number, length) {
    function pad(input, length, padding) { 
      var str = input + "";
      return (length <= str.length) ? str : pad(str + padding, length, padding);
    }
    var str        = number+"";
    var dot        = str.lastIndexOf('.');
    var isDecimal  = dot != -1;
    var integer    = isDecimal ? str.substr(0, dot) : str;
    var decimals   = isDecimal ? str.substr(dot+1)  : "";
    decimals       = pad(decimals, length, 0);
    return integer + '.' + decimals;
  }
  saveExpense(expense,formDirective: FormGroupDirective){
    console.log("Esta es ingreso a regstrar",expense);
    if(expense.amount+this.totalMonth>this.limit){
      this.snack.open('Excedio el limite del mes.','CERRAR',{duration:15000,panelClass:'warning',})
    }
     this.RequestService.post('api/expenseUser/registerExpense/'+this.user.idUser, expense)
    .subscribe({
      next:()=>{
        this.snack.open('Egreso creado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
       window.location.reload();
    
      },
      error:()=>{
        this.snack.open('Fallo al registrar el egreso','CERRAR',{duration:5000})
      }
    }); 
    
    
  }
  saveEditExpense(update,formDirective: FormGroupDirective){
    console.log(update)
    this.RequestService.put('api/expenseUser/updateExpenseOfUser/'+this.expense.idExpenseUser, update)
    .subscribe({
      next:()=>{
        this.snack.open('Egreso actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      error:()=>{
        this.snack.open('Fallo al actualizar el egreso','CERRAR',{duration:5000})
      }
    });

  }

  getErrorMessage(field: string,funct:string):string{
    let message;let name;
    if(field=='date'){name="fecha"}
    else if(field=='month'){name="mes"}
    else if(field=='concept'){name="concepto"}
    else if(field=='amount'){name="importe"}
    else if(field=='comment'){name="comentario"}
    if(funct=='register'){
      if(this.registerExpense?.get(field).errors?.required){
        message="Campo "+name+" es requerido"
      }
    }else if(funct=='edit'){

      if(this.editExpense?.get(field).hasError('pattern')){
        message="nombre de usuario no es valido"
      }else if(this.editExpense?.get(field).hasError('exist')){
        message="nombre de usuario ya esta en uso"
      }
    }
    return message
  }


  isValidField(field: string):boolean{
    return(
      (this.registerExpense.get(field).touched || this.registerExpense.get(field).dirty) &&
       !this.registerExpense.get(field).valid
    )  }
    
  isValidFieldEdit(field: string):boolean{
      return(
        (this.editExpense.get(field).touched || this.editExpense.get(field).dirty) &&
         !this.editExpense.get(field).valid
    )  
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
        if(this.transform=='register'){
          const Date=this.registerExpense.get('date').value;
          const date = (Date === null || Date === '') ? '' : Date.toISOString().split('T')[0];
          this.registerExpense.get('date').setValue(date)
          this.month=event.value.getMonth()
          
          var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
          this.loadLimits(months[this.month],event.value.getFullYear())  
          this.registerExpense.get('month').setValue(months[this.month])
          console.log(this.registerExpense.get('month'))
        }else{
          const Date=this.editExpense.get('date').value;
          const date = (Date === null || Date === '') ? '' : Date.toISOString().split('T')[0];
          this.editExpense.get('date').setValue(date)
          this.month=event.value.getMonth()
          var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
            this.editExpense.get('month').setValue(months[this.month])
        }
      }

  changeFormat(event){
     console.log(event)
  }
  loadLimits(month,year){
    this.limitStatus=false;
    this.totalMonth=0
    this.amountLimits.map(limit=>{
      if(limit.month==month && limit.year==year){
        this.limitStatus=true;
        this.limit=limit.limit;
        this.idLimit=limit.id;
       // this.registerExpense.get('idLimit').setValue(this.idLimit)
      }
    })
    if(this.limitStatus){
      console.log(this.data.allExpenses)
      this.data.allExpenses.map(expense=>{
        if(expense.month==month && expense.date.split("-")[0]==year.toString()){
          this.totalMonth+=expense.amount
        }
      })
    }else{
      this.openLimit(month,year)
    }

  }
  openLimit(month,year){
      this.dialog.open(DgAddLimitComponent,{
        width: '70%',
        data:{
          user:this.user,
          month:month,
          year:year,
          transform:"register",
        }
      });
    this.dialogRef.close() 
  }
}

