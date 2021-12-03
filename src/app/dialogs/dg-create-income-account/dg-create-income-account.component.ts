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
  income=this.formBuilder.group({
    
    incomeName:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
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
}
