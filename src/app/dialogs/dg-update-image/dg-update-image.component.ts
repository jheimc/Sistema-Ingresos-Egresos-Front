import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dg-update-image',
  templateUrl: './dg-update-image.component.html',
  styleUrls: ['./dg-update-image.component.css']
})
export class DgUpdateImageComponent implements OnInit {
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private RequestService:RequestService
  ) { }
    image=this.data.image
    idProduct=this.data.idProduct
    dataFile:any;
  fileName = '';
  formData = new FormData();

  imageForm= this.formBuilder.group({
    image:['',[Validators.required]],
    
  });
  ngOnInit(): void {
  }
  updateImage(){
    this.RequestService.put('api/setting/updateImage',this.formData).subscribe({
      next:()=>{
       window.location.reload();
       
      },
      error:()=>{
        window.location.reload();
      }
    })
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];
    //console.log(file, event);
    //this.image=file.name
    if (file) {
      this.fileName = file.name;
      const formD = new FormData();
      formD.append("image", file);
      this.imageForm.get('image').setValue(file)
      //console.log("formData",formD);
      this.formData=formD;
     }
  }
  replace:boolean=false;
  disalbedInput(){
    let disabled:boolean=false;
    if(this.dataFile!=null){
      disabled=true;
    }
    if(this.replace==true){
      disabled=false;
    }
    return disabled;
  }
}
