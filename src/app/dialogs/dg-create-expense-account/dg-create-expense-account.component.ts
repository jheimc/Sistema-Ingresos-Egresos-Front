import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-create-expense-account',
  templateUrl: './dg-create-expense-account.component.html',
  styleUrls: ['./dg-create-expense-account.component.css']
})
export class DgCreateExpenseAccountComponent implements OnInit {
  activateSpinner:boolean;
  transform:any;
  expenseData:any;
  expense=this.formBuilder.group({
    
    expenseName:['',
    {
      validators:[Validators.required], 
      asyncValidators:[this.expenseCheck()],
        updateOn: 'change'
    }],
  })
  expenseEdit=this.formBuilder.group({
    
    expenseName:['',{
      validators:[Validators.required], 
      asyncValidators:[this.expenseCheck()],
        updateOn: 'change'
    }],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.transform=this.data.transform;
    this.expenseData=this.data.expense;
    if(this.transform=='edit'){
      this.expenseEdit.controls['expenseName'].setValue(this.expenseData?.expenseName);

    }
  }
  sendExpense(expense){
   
    this.RequestService.post("api/expense/createExpense/"+this.data.user.idUser,expense).subscribe({
      next:()=>{
        this.snack.open('Cuenta creada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      error:()=>{
        this.snack.open('Error al crear cuenta.','CERRAR',{duration:5000,panelClass:'snackError',})
        //window.location.reload();

      }
    })
  }
  updateExpense(expense){
    this.RequestService.put("api/expense/updateExpense/"+this.expenseData.idExpense,expense).subscribe({
      next:()=>{
        this.snack.open('Cuenta actualizada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      error:()=>{
        this.snack.open('Error al actualizar cuenta.','CERRAR',{duration:5000,panelClass:'snackError',})
        //window.location.reload();

      }
    })
  }
  expenseCheck(): AsyncValidatorFn{
    return (control: AbstractControl) => {
    return this.RequestService.get('api/expense/noExistsExpenseName/'+control.value)
      .pipe(
        map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
  getErrorMessage(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.expense?.get(field).errors?.required){
        message="Este campo es requerido"
      }else if(this.expense?.get(field).hasError('exist')){
        message="esta cuenta ya esta registrada"
      }
    }else if(funct=='edit'){
      if(this.expenseEdit?.get(field).errors?.required){
        message="Este campo es requerido"
      }else if(this.expenseEdit?.get(field).hasError('exist')){
        message="esta cuenta ya esta registrada"
      }
    }
    return message
  }
  isValidField(field: string):boolean{
    return(
      (this.expense.get(field).touched || this.expense.get(field).dirty) &&
       !this.expense.get(field).valid
    )  
  }
  isValidFieldEdit(field: string):boolean{
    return(
      (this.expenseEdit.get(field).touched || this.expenseEdit.get(field).dirty) &&
       !this.expenseEdit.get(field).valid
    )  
  }
}

