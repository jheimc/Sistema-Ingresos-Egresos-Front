import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-add-limit',
  templateUrl: './dg-add-limit.component.html',
  styleUrls: ['./dg-add-limit.component.css']
})
export class DgAddLimitComponent implements OnInit {
  activateSpinner:boolean;
  transform:any;
  limitData:any;
  limit=this.formBuilder.group({
    
    month:['',[Validators.required]],
    year:['',[Validators.required]],
    limit:['',[Validators.required]],
  })
  limitEdit=this.formBuilder.group({
    month:['',[Validators.required]],
    year:['',[Validators.required]],
    limit:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.transform=this.data.transform;
    this.limitData=this.data;
    this.limit.controls['month'].setValue(this.limitData?.month);
      this.limit.controls['year'].setValue(this.limitData?.year);
    if(this.transform=='edit'){
      this.limitEdit.controls['limit'].setValue(this.limitData?.limit);
      this.limitEdit.controls['month'].setValue(this.limitData?.month);
      this.limitEdit.controls['year'].setValue(this.limitData?.year);

    }
  }
  sendLimit(limit){
    console.log(limit)
     this.RequestService.post("api/limit/store/"+this.data.user.idUser,limit).subscribe({
      next:()=>{
        this.snack.open('Limite añadido exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      error:()=>{
        this.snack.open('Error al añadir limite.','CERRAR',{duration:5000,panelClass:'snackError',})
        //window.location.reload();

      }
    }) 
  }
  updateLimit(expense){
    this.RequestService.put("api/expense/updateExpense/"+this.limitData.idExpense,expense).subscribe({
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
