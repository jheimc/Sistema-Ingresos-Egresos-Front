import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie= this.cookieService.check('token')
    const identifier= this.cookieService.get('identifier')
    const identifierPage= this.cookieService.get('identifierPage')
    
     if(!cookie){
       localStorage.clear()
      this.router.navigate(['/login','/login']).then(() => {
        window.location.reload();
      });
    }else{
      return true;
      
    } 
    /* if(!cookie ){
      this.router.navigate(['/','login'])
    }else{
      if(identifierPage!=""){
        if(identifier==identifierPage){
          return true;
        }else{
          this.router.navigate(['/','login'])
        }
      }else{
        return true;
      }
    } */
  
      
  }
  
}
