import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input()
  inputSideNav!: MatSidenav; 
  user:any;
  notLogedUser:boolean=false;
  permits:any;
  disabledButton:boolean=false;
  constructor(
    public cookieService:CookieService,
    private router:Router,
    private observer:BreakpointObserver,
    private RequestService:RequestService
  ) { }

  ngOnInit(): void {
    
      this.getDataUser();
    
    
    
  }
  ngAfterViewInit(){
    this.verifyUser()
  }
  
  logout(){
    this.cookieService.delete('token','/','localhost',false,'Lax')
    localStorage.clear()
    this.RequestService.post("api/auth/logout",{}).subscribe(r=>{
      console.log(r)
    })
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
    
    
    
   
    
  }
  getDataUser(){
    this.user=JSON.parse(localStorage.getItem("user"))
    this.permits=JSON.parse(localStorage.getItem("permits"))
    if(this.user==undefined || this.user==null){
      this.notLogedUser=true;
      
    }else{
      if(this.permits[0]?.authority=="ROLE_FINAL_USER"){
        this.notLogedUser=false;
      }else{
        this.notLogedUser=false;
        this.disabledButton=true;
      }
     
    }
  }
  verifyUser():any{
    if(this.notLogedUser || this.permits[0]?.authority=="ROLE_FINAL_USER"){
      this.inputSideNav.close();
      
    }else{
      this.observer.observe(['(max-width:800px)']).subscribe(res=>{
        if(res.matches){
          /* this.inputSideNav.mode='over';
          this.inputSideNav.close(); */
        }else{
          this.inputSideNav.mode='side';
          this.inputSideNav.toggle();  
        }
    })
  }
    
  }
}
