import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DgUpdateUserComponent } from 'src/app/dialogs/dg-update-user/dg-update-user.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {

  
  userData:any
  user:any;
  constructor(
    private RequestService:RequestService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.loadDataUser();
  }
  loadData(){
    this.user=JSON.parse(localStorage.getItem("user"))
  }
  loadDataUser(){
    this.RequestService.get('http://localhost:8080/api/user/getDataUser/'+this.user.idUser)
     .subscribe(r=>{
       console.log(r);
       this.userData = r;
     })
  }
  openDialogUpdate(){
    this.dialog.open(DgUpdateUserComponent,{
      width: '50%',
      data: { user:this.userData, idUser:this.user.idUser}
      });
  }
}
