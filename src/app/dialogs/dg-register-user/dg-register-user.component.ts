import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-register-user',
  templateUrl: './dg-register-user.component.html',
  styleUrls: ['./dg-register-user.component.css']
})
export class DgRegisterUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RequestService: RequestService,
    private snack:MatSnackBar,
  ) { }
    transform:any;
    roles:any;
    units:any;
    user:any;
    date:any;
  private isValidEmail:any=/\S+@\S+\.\S/;
  private isValidUserName:any=/^[a-zA-Z0-9]+$/;
  private isValidNumber="([6-7]{1})([0-9]{7})"
  unitSelected="1"
  registerUser= this.formBuilder.group({
    name:['',[Validators.required]],
    username:['',{
      validators:[Validators.required], 
      asyncValidators:[this.usernameCheck()],
        updateOn: 'blur'
    }],
    password:['',[Validators.required]],
    telephone:['',{
      validators:[Validators.required,Validators.pattern(this.isValidNumber)],
      asyncValidators:[this.telephoneCheck()],
      updateOn: 'blur'
    }],
    expiryDate:['',[Validators.required]]

  });
  editUser = this.formBuilder.group({
    name:['',[]],
    password:['',[]],
    username:['',{
      validators:[Validators.required], 
      asyncValidators:[this.usernameCheckEdit()],
        updateOn: 'blur'
    }],
    telephone:['',{
      validators:[Validators.required,Validators.pattern(this.isValidNumber)],
      asyncValidators:[this.telephoneCheckEdit()],
      updateOn: 'blur'
    }],
    expiryDate:['',[]],
  })
  hide = false;
  passwordGenerate:any=this.generatePassword(8);
  rolesDisp:any[]=[];
  destroy:boolean;
  ngOnInit(): void {
    this.transform=this.data.transform;
    this.roles=this.data.roleList;
    this.units=this.data.unitList;
    this.registerUser.controls['password'].setValue(this.passwordGenerate);

    if(this.transform=='edit'){
      this.user=this.data.user;
      let fechaDate = new Date(this.user?.expiryDate + ' 0:00:00')
      this.editUser.get('name').setValue(this.user?.name);
      this.editUser.controls['username'].setValue(this.user?.username);
      this.editUser.controls['password'].setValue("");
      this.editUser.controls['telephone'].setValue(this.user?.telephone);
      this.editUser.controls['expiryDate'].setValue(fechaDate);

    }
    //this.filterUnit();
    setTimeout(() => {  return this.destroy=false; }, 20000);
  }
  
   generatePassword(passwordLength) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  }
  
   shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  
  
  saveUser(user,formDirective: FormGroupDirective){
    this.registerUser.get('expiryDate').setValue(this.date)
    this.RequestService.post('api/user/createUser', this.registerUser.value)
    .subscribe({
      next:()=>{
        this.snack.open('Usuario registrado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
    
      },
      error:()=>{
        this.snack.open('Fallo al registrar el usuario','CERRAR',{duration:5000})
      }
    });
  }
  saveEdit(update,formDirective: FormGroupDirective){
    const expiryDate=this.editUser.get('expiryDate').value;
      this.date = (expiryDate === null || expiryDate === '') ? '' : expiryDate.toISOString().split('T')[0];
      this.editUser.get('expiryDate').setValue(this.date)
    this.RequestService.put('api/user/updateDataUser/'+this.user?.idUser, this.editUser.value)
    .subscribe({
      next:()=>{
        this.snack.open('Usuario actualizado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      error:()=>{
        this.snack.open('Fallo al actualizar el usuario','CERRAR',{duration:5000})
      }
    });

  }

  existUser:string;
  usernameCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      return this.RequestService.get('api/user/uniqueUserName/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
  telephoneCheck(): AsyncValidatorFn{

    return (control: AbstractControl) => {
      return this.RequestService.get('api/auth/uniqueTelephoneAll/'+control.value)
        .pipe(
          map((result) => (result==true) ?  null : {exist:!result})
        );
      
    };
  }
  
  getErrorMessageNumber(field: string,funct:string):string{
    let message;
    if(funct=='register'){
      if(this.registerUser?.get(field).errors?.required){
        message="Campo celular es requerido"
      }else if(this.registerUser?.get(field).hasError('pattern')){
        message="El numero de celular no es valido"
      }else if(this.registerUser?.get(field).hasError('exist')){
        message="este numero ya esta registrado"
      }
    }else if(funct=='edit'){
      if(this.editUser.get(field).hasError('pattern')){
        message="El numero no es valido"
      }else if(this.editUser?.get(field).hasError('exist')){
        message="este numero ya esta registrado"
      }
    }
    return message
  }
  getErrorMessage(field: string,funct:string):string{
    let message;

    if(funct=='register'){
      if(this.registerUser?.get(field).errors?.required){
        message="Campo nombre de usuario es requerido"
      }else if(this.registerUser?.get(field).hasError('pattern')){
        message="nombre de usuario no es valido"
      }else if(this.registerUser?.get(field).hasError('exist')){
        message="nombre de usuario ya esta en uso"
      }
    }else if(funct=='edit'){

      if(this.editUser?.get(field).hasError('pattern')){
        message="nombre de usuario no es valido"
      }else if(this.editUser?.get(field).hasError('exist')){
        message="nombre de usuario ya esta en uso"
      }
    }
    return message
  }


  isValidField(field: string):boolean{
    return(
      (this.registerUser.get(field).touched || this.registerUser.get(field).dirty) &&
       !this.registerUser.get(field).valid
    )  }
    usernameCheckEdit(): AsyncValidatorFn{
      return (control: AbstractControl) => {
      return this.RequestService.get('api/user/uniqueUserName/'+control.value)
        .pipe(
            map((result) => (result==true) ?  null : ((control.value==this.user.username)?null:{exist:!result}))
          );
        
      };
    }
    telephoneCheckEdit(): AsyncValidatorFn{

      return (control: AbstractControl) => {
        return this.RequestService.get('api/auth/uniqueTelephoneAll/'+control.value)
          .pipe(
            map((result) => (result==true) ?  null : ((control.value==this.user.telephone)?null:{exist:!result}))
          );
        
      };
    }
  getErrorMessage2(field: string,funct:string):string{
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

      addEvent(event: MatDatepickerInputEvent<Date>) {
        const expiryDate=this.registerUser.get('expiryDate').value;
      this.date = (expiryDate === null || expiryDate === '') ? '' : expiryDate.toISOString().split('T')[0];
      //this.registerUser.get('expiryDate').setValue(date)
      }

     
}


