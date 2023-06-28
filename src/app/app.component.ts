import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'project';
  displayedColumns: string[] = ['name', 'date', 'email', 'gender','mobileno','action'];
  dataSource!: MatTableDataSource<any>;

  
  constructor(private dialog :MatDialog ,private api:ApiService){}

  ngOnInit():void{
   this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      
    });
  }
  getAllProducts(){
     this.api.getProduct()
    .subscribe({
        next:(res)=>{
          this.dataSource=new MatTableDataSource(res)
        },
        error:(err)=>{
          alert("error")
        }
    })
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    })
  }
}
