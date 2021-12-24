import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { DgUpdateImageComponent } from 'src/app/dialogs/dg-update-image/dg-update-image.component';
import { DgUpdateWelcomeMessageComponent } from 'src/app/dialogs/dg-update-welcome-message/dg-update-welcome-message.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  dataConfiguration:any;
  qrData:any;
  sesionInit:boolean;
  loading:boolean;
  mySubscription: Subscription
  constructor(
    private RequestService:RequestService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDataConfigurations();
  }

  loadDataConfigurations(){
    this.RequestService.get("api/setting/getSetting").subscribe(r=>{
    //console.log(r)
    this.dataConfiguration=r
    })
  }
  
  openUpdateWelcomeMessage(){
    this.dialog.open(DgUpdateWelcomeMessageComponent,{
      width: '50%',
      data: {welcomeMessage:this.dataConfiguration.welcomeMessage }
      });
  }
  openUpdateImage(){
    this.dialog.open(DgUpdateImageComponent,{
      width: '50%',
      data: { image:this.dataConfiguration.image}
      });
  }
}
