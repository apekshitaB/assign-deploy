import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  productForm !: FormGroup
  actionbtn : string="Save"
  constructor(private formBuilder: FormBuilder, private api:ApiService ,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef :MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name :['',Validators.required],
      date :[''],
      email :['',Validators.required],
    gender :[''],
      mobileno :['',Validators.required],

    })
   if(this.editData){
    this.actionbtn="Update"
    this.productForm.controls['name'].setValue(this.editData.name);
    this.productForm.controls['date'].setValue(this.editData.date);
    this.productForm.controls['email'].setValue(this.editData.email); 
    this.productForm.controls['gender'].setValue(this.editData.gender);
    this.productForm.controls['mobileno'].setValue(this.editData.mobileno);
   }
  }
reg(){
  if(!this.editData){
    if (this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Registration completed !");
          this.productForm.reset();
          // this.dialogRef.close('save')
        },
        error:()=>{
          alert("There is some problem");
        }
      })
    }
  }
  else{   
    this.updateProduct()
  }
  // console.log(this.productForm.value);
}
  updateProduct()
  {
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("updated Successfully !")
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('There is some error');
      }
    })
   }
}
