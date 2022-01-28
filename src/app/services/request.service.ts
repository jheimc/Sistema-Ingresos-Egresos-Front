import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
 // baseUrl:string ='http://localhost:8080/'
 baseUrl:string=environment.baseUrl;
  constructor(
    private http: HttpClient,
  ) { }
  public post(url:string, body){
    return this.http.post(this.baseUrl+url,body);
  }
  public get(url:string){
    return this.http.get(this.baseUrl+url);
  }
  public get2(url:string,body){
    return this.http.get(this.baseUrl+url,body);
  }
  public put(url:string, body){
    return this.http.put(this.baseUrl+url,body);
  }
  public delete(url:string){

    return this.http.delete(this.baseUrl+url);
  
  }
}
