import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DgForgetPasswordComponent } from 'src/app/dialogs/dg-forget-password/dg-forget-password.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public idUser:any;
  public user:any={};
  public userName:any;
  public errorLogin:boolean;
  
    loginForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
    });
   
    constructor(
      private formBuilder: FormBuilder,
      private RequestService: RequestService,
      private cookieService: CookieService,
      private router: Router,
      public dialog: MatDialog,
      private sanitizer: DomSanitizer
    ) { 
      this.loadDataConfigurations();
    }
    hide=true;
    expiryMessage:string;
    dataConfiguration:any;
    ngOnInit(): void {
      
      /* localStorage.clear()
      this.cookieService.deleteAll(); */
    }
    
    onLogin(login,formDirective: FormGroupDirective){
      this.errorLogin=false;
      //console.log(login)
      this.RequestService.post('api/auth/authenticate',login)
      .subscribe( {
        next:(respuesta:any)=>{
          formDirective.resetForm();
          const dateNow = new Date();
          dateNow.setMinutes(dateNow.getMinutes() + 60);
          this.cookieService.set('token',respuesta.jwt,dateNow)
          this.cookieService.set('identifier',respuesta.identifier,dateNow)
          if(respuesta.id!=undefined){
            this.idUser=respuesta.id 
          }else{
            this.idUser=respuesta.idFinalUser;
          }
          
          this.expiryMessage=respuesta.expiryMessage;
          this.userName=respuesta.userName;
          this.user={idUser:this.idUser,userName:this.userName,name:respuesta.name}
          this.saveDataUser(respuesta.roles);
          //this.sendRoute(respuesta.identifier)
          
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          }); 
         // window.location.reload()
          
         },
        error:()=>{
          formDirective.resetForm();
          this.errorLogin=true;
        }
      });
        
    }
    
    saveDataUser(roles:any){
      localStorage.setItem("user",JSON.stringify(this.user));
      localStorage.setItem("permits",JSON.stringify(roles));
      localStorage.setItem("expiryMessage",JSON.stringify(this.expiryMessage));
    }
    openForgetPassword(){
      this.dialog.open(DgForgetPasswordComponent,{
        width: '60%',
        data: { }
        });
    
  }
  loadDataConfigurations(){
    this.RequestService.get("api/setting/getSetting").subscribe(r=>{
      this.dataConfiguration=r
    }) 
  }
  }
  

