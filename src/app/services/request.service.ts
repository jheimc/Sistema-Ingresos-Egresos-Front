import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  ) { }
  public post(url:string, body){
    return this.http.post(url,body);
  }
  public get(url:string){
    return this.http.get(url);
  }
  public put(url:string, body){
    return this.http.put(url,body);
  }
  public delete(url:string){

    return this.http.delete(url);
  
  }
}
