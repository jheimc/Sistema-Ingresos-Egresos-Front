import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-create-income-account',
  templateUrl: './dg-create-income-account.component.html',
  styleUrls: ['./dg-create-income-account.component.css']
})
export class DgCreateIncomeAccountComponent implements OnInit {
  activateSpinner:boolean;
  transform:any;
  incomeData:any;
  income=this.formBuilder.group({
    
    incomeName:['',{
      validators:[Validators.required], 
      asyncValidators:[this.incomeCheck()],
        updateOn: 'change'
    }],
  })
  incomeEdit=this.formBuilder.group({
    
    incomeName:['',{
      validators:[Validators.required], 
      asyncValidators:[this.incomeCheck()],
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
    this.incomeData=this.data.income;
    if(this.transform=='edit'){
      this.incomeEdit.controls['incomeName'].setValue(this.incomeData?.incomeName);

    }
  }
  sendIncome(income){
    this.RequestService.post("api/income/createIncome/"+this.data.user.idUser,income).subscribe({
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
  updateIncome(income){
    this.RequestService.put("api/income/updateIncome/"+this.incomeData.idIncome,income).subscribe({
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
  incomeCheck(): AsyncValidatorFn{
    return (control: AbstractControl) => {
    return this.RequestService.get('api/income/noExistsIncomeName/'+control.value)
      .pipe(
        map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
  getErrorMessage(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.income?.get(field).errors?.required){
        message="Este campo es requerido"
      }else if(this.income?.get(field).hasError('exist')){
        message="esta cuenta ya esta registrada"
      }
    }else if(funct=='edit'){
      if(this.income?.get(field).errors?.required){
        message="Este campo es requerido"
      }else if(this.incomeEdit?.get(field).hasError('exist')){
        message="esta cuenta ya esta registrada"
      }
    }
    return message
  }
  isValidField(field: string):boolean{
    return(
      (this.income.get(field).touched || this.income.get(field).dirty) &&
       !this.income.get(field).valid
    )  
  }
  isValidFieldEdit(field: string):boolean{
    return(
      (this.incomeEdit.get(field).touched || this.incomeEdit.get(field).dirty) &&
       !this.incomeEdit.get(field).valid
    )  
  }
}
