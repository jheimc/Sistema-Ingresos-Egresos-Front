import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
    ) { }
    hide=true;
    ngOnInit(): void {
      /* localStorage.clear()
      this.cookieService.deleteAll(); */
    }
    
    onLogin(login,formDirective: FormGroupDirective){
      this.errorLogin=false;
      //console.log(login)
      this.RequestService.post('http://localhost:8080/api/auth/authenticate',login)
      .subscribe( {
        next:(respuesta:any)=>{
          console.log(respuesta)
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
          
    
          this.userName=respuesta.userName;
          console.log(this.user)
          this.user={idUser:this.idUser,userName:this.userName,}
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
    }
    
  }
  

