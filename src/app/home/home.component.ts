import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from './file-upload.service';
import { Observable} from 'rxjs'
import { HttpEventType } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
export interface FileInfo
{
  id:String,
  fileName:String;
  uploadDate:Date;
  fileLocation:String;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})

export class HomeComponent implements OnInit,AfterViewInit  {
  @ViewChild('myTable') table!: ElementRef;

  fileForm!:FormGroup;
  file!:File;
  process:number=0;
  fileInfo!:FileInfo[];
  rowCount!:number;
  constructor(private formBuilder:FormBuilder,private fileService:FileUploadService) {
     
    
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit()
  {
    this.fileForm=this.formBuilder.group({
      fileName:new FormControl('',[Validators.required,Validators.pattern(/[^.]+$/)]),
      uploadDate:new FormControl(new Date()),
      fileData:new FormControl(null,[Validators.required]),
      });
      this.fileService.getFile().subscribe(
        data=>this.fileInfo=data)
  }
  selectFile(event:any)
{
  
  this.fileForm.patchValue({fileData:event.target.files[0]});
  
}
upload()
{
    const formData=new FormData();
    formData.append('fileName',this.fileForm.get('fileName')?.value);
    formData.append('uploadData',this.fileForm.get('uploadDate')?.value);
    formData.append('fileData',this.fileForm.get('fileData')?.value)
    this.fileService.postFile(formData).subscribe().add(()=>
    {this.fileService.getFile().subscribe(data=>{this.fileInfo=data;console.log(data)})});
    
}
deleteFile(id:String)
{
  // console.log(id);
  this.fileService.removeFile(id).subscribe().add(()=>
  this.fileService.getFile().subscribe((data)=>this.fileInfo=data));
}


}
