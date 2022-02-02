import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-message',
  templateUrl: './dg-message.component.html',
  styleUrls: ['./dg-message.component.css']
})
export class DgMessageComponent implements OnInit {
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
      this.RequestService.put('api/expense/deleteExpense/'+this.data.idExpense,"")
      .subscribe({
        error:(e)=>{
          console.log(e.error.text)
          if(e.error.text=="No se puede eliminar la cuenta de egreso "+this.data.expenseName){
            console.log("no se puede eliminar")
            this.snack.open('No se puede eliminar, la cuenta '+this.data.expenseName+ ' tiene transacciones','CERRAR',{duration:5000,panelClass:'warning'})
          }else{
            this.snack.open('Cuenta eliminada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
            window.location.reload();
          }
        },
      });
    }else{
      this.RequestService.put('api/income/deleteIncome/'+this.data.idIncome,"")
    .subscribe({
      error:(e)=>{
        if(e.error.text=="No se puede eliminar la cuenta de ingreso "+this.data.incomeName){
          this.snack.open('No se puede eliminar, la cuenta '+this.data.incomeName+ ' tiene transacciones','CERRAR',{duration:5000,panelClass:'warning'})
        }else{
          this.snack.open('Cuenta eliminada exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
          window.location.reload();
        }
      },
    });
    }
    
  }
}
