import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-message-transaction',
  templateUrl: './dg-message-transaction.component.html',
  styleUrls: ['./dg-message-transaction.component.css']
})
export class DgMessageTransactionComponent implements OnInit {
  expense:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private RequestService:RequestService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.expense=this.data
  }
  deleteExpense(){
    if(this.data.account=="expense"){
      this.RequestService.delete('api/expenseUser/deleteExpenseOfUser/'+this.data.idExpenseUser)
      .subscribe({
        error:(e)=>{
          if(e.error.text=="Se eliminó correctamente"){
            this.snack.open('Transacción eliminada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
            window.location.reload();
          }else{
            this.snack.open('Ocurrió un error, No se puede eliminar la transacción','CERRAR',{duration:5000,panelClass:'warning'})
            
          }
        },
      });
    }else{
      this.RequestService.delete('api/incomeUser/deleteIncomeOfUser/'+this.data.idIncomeUser)
      .subscribe({
        error:(e)=>{
          if(e.error.text=="Se eliminó correctamente"){
            this.snack.open('Transacción eliminada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
            window.location.reload();
          }else{
            this.snack.open('Ocurrió un error, No se puede eliminar la transacción','CERRAR',{duration:5000,panelClass:'warning'})
            
          }
        },
      });
    }
    
  }
}

