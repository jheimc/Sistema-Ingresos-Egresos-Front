import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  open=false;
  openReport=false;
  openBuyer=false;
  user:any;
  permits:any;
  expiryMessage:any;
  ROLE_ADMIN:boolean;
  ROLE_USER_FINAL:boolean;
  constructor(
    public cookieService:CookieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadDataUser();
  }
  logout(){
    this.cookieService.delete('token','/','localhost',false,'Lax')
    localStorage.clear()
    window.location.reload();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
    loadDataUser(){
      this.user=JSON.parse(localStorage.getItem("user"))
      this.permits=JSON.parse(localStorage.getItem("permits"))
      this.expiryMessage=JSON.parse(localStorage.getItem("expiryMessage"))
      this.loadPermits()
     
    }
    loadPermits(){
      this.permits?.map(p=>{
        if(p.authority=="ROLE_ADMIN"){
          this.ROLE_ADMIN=true;
        }
        if(p.authority=="ROLE_USER_FINAL"){
          this.ROLE_USER_FINAL=true;
        }
        
      })
    }
  
}
