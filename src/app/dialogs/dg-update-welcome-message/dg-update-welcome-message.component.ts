import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-update-welcome-message',
  templateUrl: './dg-update-welcome-message.component.html',
  styleUrls: ['./dg-update-welcome-message.component.css']
})
export class DgUpdateWelcomeMessageComponent implements OnInit {

  public activateSpinner:boolean;
  dataDistance:any;
  formData = new FormData();
  update=this.formBuilder.group({
    
    welcomeMessage:['',[Validators.required]],
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService,
  ) { }
    
  ngOnInit(): void {
    this.dataDistance=this.data
    this.update.get('welcomeMessage').setValue(this.data.welcomeMessage)
  }
  
  updateWelcomeMessage(data){
    this.formData.append('welcomeMessage',data)
   this.activateSpinner=true;
    this.RequestService.put("http://localhost:8080/api/setting/updateWelcomeMessage",this.formData).subscribe({
      next:()=>{
        this.activateSpinner=false;
        window.location.reload()
      },error:()=>{
        this.activateSpinner=false;
        window.location.reload()
      }
    })
  }
}
