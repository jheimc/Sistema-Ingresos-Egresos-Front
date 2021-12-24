import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DgRegisterUserComponent } from 'src/app/dialogs/dg-register-user/dg-register-user.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private RequestService: RequestService,
    private snack:MatSnackBar,) { }
 
  usersResponse:any;
  users:any[]=[];
  idUser:any;
  userName:any;
  privilegios:any;
  displayedColumns: string[] = ['index', 'name','username','telephone','registrationDate','expiryDate','actions'];
  dataSource =  new MatTableDataSource<any>([]);
  columnas=[
    {titulo:"NOMBRE" ,name: "name"},
    {titulo:"USERNAME" ,name: "username"},
    {titulo:"TELEFONO" ,name: "telephone"},
    {titulo:"FECHA DE REGISTRO" ,name: "registrationDate"},
    {titulo:"FECHA DE EXPIRACION" ,name: "expiryDate"},

  ];
  

  ngOnInit(): void {
    this.loadUsers();
    
  }

  loadUsers(){
    this.RequestService.get('api/user/allUser').subscribe(r=>{
      this.usersResponse=r;
      this.users=this.usersResponse;
      this.dataSource.data=this.users;
      console.log("USERS ",this.users)
    })
  }

  openRegisterUser(){
    this.dialog.open(DgRegisterUserComponent,{
      width: '60%',
      data:{
        user:null,
        transform:'register',
      }
    }); 
  }
  openEditUser(user){
    this.dialog.open(DgRegisterUserComponent,{
      width: '60%',
      data:{
        user:user,
        transform:'edit',
      }
    });
  }


  deleteUser(idUser){
    console.log(idUser)
    this.RequestService.put('api/user/deleteUser/'+idUser,{})
    .subscribe({
      error:()=>{
        this.snack.open('Usuario eliminado exitosamente.','CERRAR',{duration:5000,panelClass:'snackSuccess',})
        window.location.reload();
      },
      /* error:()=>{
        this.snack.open('Fallo al eliminar el usuario','CERRAR',{duration:5000})
      } */
    });
  }
}
