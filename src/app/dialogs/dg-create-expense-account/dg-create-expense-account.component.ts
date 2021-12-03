import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-create-expense-account',
  templateUrl: './dg-create-expense-account.component.html',
  styleUrls: ['./dg-create-expense-account.component.css']
})
export class DgCreateExpenseAccountComponent implements OnInit {
  activateSpinner:boolean;
  expense=this.formBuilder.group({
    
    expenseName:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  sendExpense(expense){
    console.log(expense)
    this.RequestService.post("http://localhost:8080/api/expense/createExpense/"+this.data.user.idUser,expense).subscribe({
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

