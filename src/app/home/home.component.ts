import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from './file-upload.service';
import { Observable} from 'rxjs'
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fileForm!:FormGroup;
  file!:File;
  process:number=0;
  constructor(private formBuilder:FormBuilder,private fileService:FileUploadService) {
     
    
  }
  ngOnInit()
  {
    this.fileForm=this.formBuilder.group({
      fileName:new FormControl('',[Validators.required,Validators.pattern(/[^.]+$/)]),
      uploadDate:new FormControl(new Date()),
      })
  }
  selectFile(event:any)
{
  this.file=event.target.files[0];
  
}
upload()
{
    const formData=new FormData();
    formData.append('fileName',this.fileForm.get('fileName')?.value);
    formData.append('uploadData',this.fileForm.get('uploadDate')?.value);
    formData.append('fileData',this.file)
    this.fileService.postFile(formData).subscribe()
}

}
