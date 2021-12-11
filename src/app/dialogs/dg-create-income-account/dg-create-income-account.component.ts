import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    
    incomeName:['',[Validators.required]],
  })
  incomeEdit=this.formBuilder.group({
    
    incomeName:['',[Validators.required]],
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
    console.log(this.data.income)
    if(this.transform=='edit'){
      this.incomeEdit.controls['incomeName'].setValue(this.incomeData?.incomeName);

    }
  }
  sendIncome(income){
    console.log(income)
    this.RequestService.post("http://localhost:8080/api/income/createIncome/"+this.data.user.idUser,income).subscribe({
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
    this.RequestService.put("http://localhost:8080/api/income/updateIncome/"+this.incomeData.idIncome,income).subscribe({
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
}
