import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import { DgRestartPasswordComponent } from '../dg-restart-password/dg-restart-password.component';

@Component({
  selector: 'app-dg-forget-password',
  templateUrl: './dg-forget-password.component.html',
  styleUrls: ['./dg-forget-password.component.css']
})
export class DgForgetPasswordComponent implements OnInit {
  
  private isValidNumber="([6-7]{1})([0-9]{7})"
  public activateSpinner:boolean;
  changePassword=this.formBuilder.group({
    
    telephone:['',{
      validators:[Validators.required,Validators.pattern(this.isValidNumber)],
      asyncValidators:[this.telephoneCheck()],
      updateOn: 'blur'
    }],
  })
  code:any;
  idUser:any;
  constructor(
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<DgForgetPasswordComponent>,
  ) { }

  ngOnInit(): void {
  }
  sendEmail(){
    var telephone=this.changePassword.get('telephone').value
    this.activateSpinner=true;
    this.RequestService.get("http://localhost:8080/api/auth/recoverByPhone/"+telephone).subscribe(r=>{
      console.log(r)
      this.idUser=r
      this.activateSpinner=false;
      this.openRestartPassword();
      this.dialogRef.close();
    })

  }
  telephoneCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/auth/uniqueTelephoneAll/'+control.value)
        .pipe(
          map((result) => (result==true) ?  {exist:result} :null )
        );
      
    };
  }
  getErrorMessageNumber(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.changePassword?.get(field).errors?.required){
        message="Campo celular es requerido"
      }else if(this.changePassword?.get(field).hasError('pattern')){
        message="El numero de celular no es valido"
      }else if(this.changePassword?.get(field).hasError('exist')){
        message="este numero no esta registrado"
      }
    }
    return message
  }
  
  isValidField(field: string):boolean{
    return(
      (this.changePassword.get(field).touched || this.changePassword.get(field).dirty) &&
       !this.changePassword.get(field).valid
    )  
  }
  openRestartPassword(){
    this.dialog.open(DgRestartPasswordComponent,{
      width: '60%',
      data: {user:this.idUser}
      });
  
  }
}
