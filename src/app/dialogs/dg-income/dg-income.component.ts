import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-income',
  templateUrl: './dg-income.component.html',
  styleUrls: ['./dg-income.component.css']
})
export class DgIncomeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar,
  ) { }
    transform:any;
    incomes:any;
    income:any;
    user:any;
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
  registerIncome= this.formBuilder.group({
    date:['',[Validators.required]],
    month:['',[Validators.required]],
    concept:['',[Validators.required]],
    amount:['',[Validators.required]],
    comment:['',[Validators.required]],
    idIncome:['',[Validators.required]],

  });
  editIncome = this.formBuilder.group({
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
    this.incomes=this.data.incomesList;
    this.user=this.data.user
    if(this.transform=='edit'){
      this.income=this.data.income;
      this.editIncome.get('date').setValue(this.income?.date);
      this.editIncome.controls['month'].setValue(this.income?.month);
      this.editIncome.controls['concept'].setValue(this.income?.concept);
      this.editIncome.controls['amount'].setValue(this.income?.amount);
      this.editIncome.controls['comment'].setValue(this.income?.comment);

    }
  }
  
  saveIncome(income,formDirective: FormGroupDirective){
    this.RequestService.post('api/incomeUser/registerIncome/'+this.user.idUser, income)
    .subscribe({
      next:()=>{
        this.snack.open('Ingreso creado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
    
      },
      error:()=>{
        this.snack.open('Fallo al registrar el ingreso','CERRAR',{duration:5000})
      }
    });
  }
  saveEditIncome(update,formDirective: FormGroupDirective){

    console.log(update)
    this.RequestService.put('api/incomeUser/updateIncomeOfUser/'+this.income.idIncomeUser, update)
    .subscribe({
      next:()=>{
        this.snack.open('Ingreso actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      error:()=>{
        this.snack.open('Fallo al actualizar el ingreso','CERRAR',{duration:5000})
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
      if(this.registerIncome?.get(field).errors?.required){
        message="Campo "+name+" es requerido"
      }
    }else if(funct=='edit'){

      if(this.editIncome?.get(field).hasError('pattern')){
        message="nombre de usuario no es valido"
      }else if(this.editIncome?.get(field).hasError('exist')){
        message="nombre de usuario ya esta en uso"
      }
    }
    return message
  }


  isValidField(field: string):boolean{
    return(
      (this.registerIncome.get(field).touched || this.registerIncome.get(field).dirty) &&
       !this.registerIncome.get(field).valid
    )  }
    
    isValidFieldEdit(field: string):boolean{
      return(
        (this.editIncome.get(field).touched || this.editIncome.get(field).dirty) &&
         !this.editIncome.get(field).valid
      )  }

      addEvent(event: MatDatepickerInputEvent<Date>) {
        if(this.transform=='register'){
          const Date=this.registerIncome.get('date').value;
          const date = (Date === null || Date === '') ? '' : Date.toISOString().split('T')[0];
          this.registerIncome.get('date').setValue(date)
          this.month=event.value.getMonth()
          var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
            this.registerIncome.get('month').setValue(months[this.month])
        }else{
          const Date=this.editIncome.get('date').value;
          const date = (Date === null || Date === '') ? '' : Date.toISOString().split('T')[0];
          this.editIncome.get('date').setValue(date)
          this.month=event.value.getMonth()
          var months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
            this.editIncome.get('month').setValue(months[this.month])
        }
        
      }

      NumCheck(e, field) {
        var regexp;
        var key = e.keyCode ? e.keyCode : e.which
        // backspace
        if (key == 8) return true
        // 0-9
        if (key > 47 && key < 58) {
          if (field.value == "") return true
          regexp = /.[0-9]{2}$/
          return !(regexp.test(field.value))
        }
        // .
        if (key == 46) {
          if (field.value == "") return false
          regexp = /^[0-9]+$/
          return regexp.test(field.value)
        }
        // other key
        return false
       
      }
}

