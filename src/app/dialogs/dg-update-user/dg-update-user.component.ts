import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-update-user',
  templateUrl: './dg-update-user.component.html',
  styleUrls: ['./dg-update-user.component.css']
})
export class DgUpdateUserComponent implements OnInit {
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DgUpdateUserComponent>,
    private dialog:MatDialog,
    private RequestService:RequestService,
    private formBuilder:FormBuilder,
    private snack:MatSnackBar,
  ) { }
  hide = false;
  activateSpinner:boolean
  private isValidUserName:any=/^[a-zA-Z0-9]+$/;
  private isValidNumber="([6-7]{1})([0-9]{7})"
  editUser = this.formBuilder.group({
    password:['',{
      validators:[Validators.required,]
    }],
    telephone:['',{
      validators:[Validators.required,Validators.pattern(this.isValidNumber)],
      asyncValidators:[this.telephoneCheck()],
      updateOn: 'blur'
    }],
    username:['',{
      validators:[Validators.pattern(this.isValidUserName)], 
      asyncValidators:[this.usernameCheck()],
        updateOn: 'blur'
    }]
  })
  
  user=this.data.user;

  ngOnInit(): void {
    this.user=this.data.user;
      //this.fiterRoleType();
      console.log(this.user)
      this.editUser.controls['finalUserName'].setValue(this.user?.finalUserName);
      //this.editUser.controls['password'].setValue(this.user?.password);
      this.editUser.controls['username'].setValue(this.user?.username);
      this.editUser.controls['telephone'].setValue(this.user?.telephone);
      this.editUser.controls['password'].setValue(this.user?.password);

  }

  saveEdit(update,formDirective: FormGroupDirective){
    this.activateSpinner=true;
    if(update.username==this.user.username){
      update.userName=""
    }
    if(update.password==this.user.password){
      update.password=""
    }
    if(update.telephone==this.user.telephone){
      update.telephone=""
    }
    if(update.finalUserName==this.user.finalUserName){
      update.finalUserName=""
    }
    console.log(update)
    this.RequestService.put('http://localhost:8080/api/user/updateDataFinalUser/'+this.user?.idUser, update)
    .subscribe({
      next:(r:any)=>{
        console.log(r)
        
        this.snack.open('Usuario actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        //window.location.reload()
        
        //window.location.reload();
      },
      error:()=>{
        this.snack.open('Fallo al actualizar el usuario','CERRAR',{duration:5000})
      }
    });

  }

  existUser:string;
  usernameCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      return this.RequestService.get('http://localhost:8080/api/user/uniqueUserName/'+control.value)
        .pipe(
            map((result) => (result==true) ?  null : ((control.value==this.user.username)?null:{exist:!result}))
          );
        
      };
  }
  telephoneCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      console.log(control.value)
      return this.RequestService.get('http://localhost:8080/api/auth/uniqueTelephoneAll/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : ((control.value==this.user.telephone)?null:{exist:!result}))
        );
      
    };
  }
  
  
  getErrorMessage(field: string,funct:string):string{
    let message;let name;
    if(field=="email"){
      name="email"
    }else if(field=="telephone"){
      name="el numero"
    }else if(field=="userName"){
      name="el nombre de usuario"
    }
    
      if(this.editUser?.get(field).hasError('pattern')){
        message= name+" no es valido"
      }else if(this.editUser?.get(field).hasError('exist')){
        message=name+"  ya esta en uso"
      }
    
    return message
  }


  
    isValidFieldEdit(field: string):boolean{
      return(
        (this.editUser.get(field).touched || this.editUser.get(field).dirty) &&
         !this.editUser.get(field).valid
      )  }

      
}
