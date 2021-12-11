import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

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
  ) { }
    transform:any;
    expenses:any;
    expense:any;
    user:any;
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
  registerExpense= this.formBuilder.group({
    date:['',[Validators.required]],
    month:['',[Validators.required]],
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
    idIncome:['',[]],
  })
  ngOnInit(): void {
   console.log(this.data)
    this.transform=this.data.transform;
    this.expenses=this.data.expensesList;
    this.user=this.data.user
    if(this.transform=='edit'){
      this.expense=this.data.expense;
      this.editExpense.get('date').setValue(this.expense?.date);
      this.editExpense.controls['month'].setValue(this.expense?.month);
      this.editExpense.controls['concept'].setValue(this.expense?.concept);
      this.editExpense.controls['amount'].setValue(this.expense?.amount);
      this.editExpense.controls['comment'].setValue(this.expense?.comment);

    }
  }
  
  saveExpense(expense,formDirective: FormGroupDirective){
    console.log("Esta es ingreso a regstrar",expense);
    
    this.RequestService.post('http://localhost:8080/api/expenseUser/registerExpense/'+this.user.idUser, expense)
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
    this.RequestService.put('http://localhost:8080/api/expenseUser/updateExpenseOfUser/'+this.expense.idExpenseUser, update)
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
      )  }

      addEvent(event: MatDatepickerInputEvent<Date>) {
        const Date=this.registerExpense.get('date').value;
      const date = (Date === null || Date === '') ? '' : Date.toISOString().split('T')[0];
      this.registerExpense.get('date').setValue(date)
      }

     
}

