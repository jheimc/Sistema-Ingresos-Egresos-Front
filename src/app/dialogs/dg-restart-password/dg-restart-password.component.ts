import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-restart-password',
  templateUrl: './dg-restart-password.component.html',
  styleUrls: ['./dg-restart-password.component.css']
})
export class DgRestartPasswordComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DgRestartPasswordComponent>,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snack:MatSnackBar,

  ) { }

  private isValidNumber="([6-7]{1})([0-9]{7})"
  hide=true;
  hide2=true;
  identifier=this.data.identifier
  
  changePasswordUser=this.formBuilder.group({
    password:['',{
      validators:[Validators.required,Validators.minLength(6)],
    }],
    confirmPassword:['',[Validators.required,Validators.minLength(6),this.confirmCheckUser()]],
  })
  ngOnInit(): void {
    console.log(this.data)
  }
  existUser:string;
  
  getErrorMessage(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.changePasswordUser?.get(field).errors?.required){
        message="nueva contraseña es requerido"
      }else if(this.changePasswordUser?.get(field).hasError('pattern')){
        message="ingrese un numero de telefono valido"
      }else if(this.changePasswordUser?.get(field).hasError('exist')){
        message="el numero ya esta registrado"
      }
    }
    return message
  }
  getErrorMessage2(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.changePasswordUser?.get(field).errors?.required){
        message="nueva contraseña es requerido"
      }else if(this.changePasswordUser?.get(field).hasError('pattern')){
        message="ingrese un numero de telefono valido"
      }else if(this.changePasswordUser?.get(field).hasError('same')){
        message="ingrese la misma contraseña"
      }
    }
    return message
    
  }
  isValidField(field: string):boolean{
    return(
      (this.changePasswordUser.get(field).touched || this.changePasswordUser.get(field).dirty) &&
       !this.changePasswordUser.get(field).valid
    )  
  }
  confirmCheckUser(){
    return(control: AbstractControl)=>{
      if(control.value==this.changePasswordUser?.get('password').value){
        return null;
      }else{
        return {same:false}
      }
        
    }

  } 
  updatePassword(){
    
      var dataUser={idUser:this.data.user.idUser,password:this.changePasswordUser.get('password').value}
      
      this.RequestService.put("api/auth/changePassword",dataUser)
      .subscribe({
        next:()=>{
          this.snack.open('contraseña actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
         
          this.dialogRef.close()
          window.location.reload();
          
        },
        error:()=>{
          //this.snack.open('Fallo al actualizar la contraseña','CERRAR',{duration:5000})
          //this.snack.open('Error.','CERRAR',{duration:5000,})
          this.snack.open('contraseña actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
         
          this.dialogRef.close()
          window.location.reload();
        }
      });
    
  }
}
