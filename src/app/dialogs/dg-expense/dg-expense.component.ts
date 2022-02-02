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
    date:any;
    expenses:any;
    expense:any;
    user:any;
    limitStatus:boolean=false;
    limit:number;
    totalMonth:number;
    totalAccount:number=0;
    idLimit:number;
    selectDate=false;
    month:any;
    year:any;
    selectAccount:any;
    limits:any;
    amount:number=0;
    prueba:any;
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
    this.dialogRef.updateSize('80%', '90%');
    this.transform=this.data.transform;
    this.expenses=this.data.expensesList;
    this.user=this.data.user
    if(this.transform=='edit'){
      this.expense=this.data.expense;
      let fechaDate = new Date(this.expense?.date + ' 0:00:00')
      this.editExpense.get('date').setValue(fechaDate);
      this.editExpense.controls['month'].setValue(this.expense?.month);
      this.editExpense.controls['concept'].setValue(this.expense?.concept);
      this.editExpense.controls['amount'].setValue(this.expense?.amount);
      this.editExpense.controls['comment'].setValue(this.expense?.comment);
      
      /* this.selectDate=true;
      this.onChangeAccount() */
      this.expenses.map(e=>{
        if(e.expenseName==this.expense.expenseAccount){
          this.editExpense.controls['idExpense'].setValue(e.idExpense);
        }
      })
    }
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
    this.registerExpense.get('date').setValue(this.date)
    if(expense.amount+this.totalMonth>this.limit){
      this.snack.open('Excedio el limite del mes.','CERRAR',{duration:15000,panelClass:'warning',})
    }
     this.RequestService.post('api/expenseUser/registerExpense/'+this.user.idUser, this.registerExpense.value)
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
    this.editExpense.get('date').setValue(this.date)
    this.RequestService.put('api/expenseUser/updateExpenseOfUser/'+this.expense.idExpenseUser, this.editExpense.value)
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
      this.selectDate=true;
        if(this.transform=='register'){
          const Date=this.registerExpense.get('date').value;
          this.date = (Date === null || Date === '') ? '' : Date.toISOString().split('T')[0];
         // this.registerExpense.get('date').setValue(date)
          this.month=event.value.getMonth()
          this.year=event.value.getFullYear()
          var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
         // this.loadLimits(months[this.month],event.value.getFullYear())  
          this.registerExpense.get('month').setValue(months[this.month])
          this.month=months[this.month]
          if(this.selectAccount){
            this.onChangeAccount()
          }
         // console.log(this.registerExpense.get('month'))
        }else{
          const Date=this.editExpense.get('date').value;
          this.date = (Date === null || Date === '') ? '' : Date.toISOString().split('T')[0];
          //this.editExpense.get('date').setValue(date)
          this.month=event.value.getMonth()
          var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
            this.editExpense.get('month').setValue(months[this.month])
            this.month=months[this.month]
            if(this.selectAccount){
              this.onChangeAccount()
            }
        }
      }

  changeFormat(event){
     console.log(event)
  }
  onChangeAccount(){ 
    this.selectAccount=true;
    this.limitStatus=false;
    if(this.selectDate ){
      this.RequestService.get("api/limit/getByAccount/"+this.registerExpense.get('idExpense').value+"/"+this.year).subscribe(res=>{
        this.limits=res;
        this.limits.map(limit=>{
          if(this.month==limit.month && this.year==limit.year){
            this.getTotalAccount(this.registerExpense.get('idExpense').value)
            this.limitStatus=true;
            this.limit=limit.limit;
            this.idLimit=limit.id;
          }
        })
        if(this.limitStatus==false){
          this.openLimit(this.month,this.year,this.registerExpense.get('idExpense').value)
        }
      })
    }
  }

  getTotalAccount(id){
    this.totalAccount=0;
    console.log(this.data.allExpenses)
    this.data.allExpenses.map(expense=>{
      if(expense.idExpense==id && expense.month==this.month && expense.date.split("-")[0]==this.year.toString()){
        this.totalAccount+=expense.amount
      }
    })
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
      //this.openLimit(month,year)
    }

  }
  openLimit(month,year,idExpense){
      this.dialog.open(DgAddLimitComponent,{
        width: '70%',
        data:{
          idExpense:idExpense,
          user:this.user,
          month:month,
          year:year,
          transform:"register",
        }
      });
    this.dialogRef.close() 
  }
  openEditLimit(){
    this.dialog.open(DgAddLimitComponent,{
      width: '70%',
      data:{
        idExpense:this.registerExpense.get('idExpense').value,
        user:this.user,
        month:this.month,
        year:this.year,
        limit:this.limit,
        idLimit:this.idLimit,
        transform:"edit",
      }
    });
    this.dialogRef.close() 
  }
  amountChange(value){
    this.amount=this.registerExpense.get('amount').value
  }
}

