import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from './file-upload.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

export interface FileInfo {
  id: String,
  fileName: string;
  uploadDate: Date;
  fileLocation: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('myTable') table!: ElementRef;

  fileForm!: FormGroup;
//file!:File;
  process: number = 0;
  fileInfo!: FileInfo[];
  rowCount!: number;
  fileMsg = "";
  uploadStatus:boolean=false;
  errorMsg="";
  
  constructor(private formBuilder: FormBuilder, private fileService: FileUploadService) {


  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    this.fileForm = this.formBuilder.group({
      fileName: new FormControl('', [Validators.required, Validators.pattern(/[^.]+$/)]),
      uploadDate: new FormControl(new Date()),
      fileData: new FormControl(null, [Validators.required]),
    });
    this.fileService.getFile().subscribe(
      data => this.fileInfo = data)
  }
  selectFile(event: any) {

    this.fileForm.patchValue({ fileData: event.target.files[0] });

  }
  upload() {
    const formData = new FormData();
    formData.append('fileName', this.fileForm.get('fileName')?.value);
    formData.append('uploadData', this.fileForm.get('uploadDate')?.value);
    formData.append('fileData', this.fileForm.get('fileData')?.value);
    this.fileService.postFile(formData).subscribe({
      next: (event: any) => {
        // console.log(event.type);

        switch (event.type) {
          case HttpEventType.UploadProgress:

            this.process = Math.round((100 * event.loaded) / event.total);

        }
        if(this.process===100)
        {
          this.uploadStatus=true;
        }
        

      },
      error: (err:HttpErrorResponse) =>{
        if(err.status===409)
        {
           this.errorMsg=err.error;
           this.uploadStatus=false;
        }
        else if(err.status===400)
        {
          this.errorMsg=err.error;
          this.uploadStatus=false;
        }
        setTimeout(()=>{this.errorMsg=""},3000)
        }
    }).add(() => { this.fileService.getFile().subscribe(data => { this.fileInfo = data; }) });
    // this.fileService.postFile(formData).subscribe().add(()=>
    // {this.fileService.getFile().subscribe(data=>{this.fileInfo=data;console.log(data)})});
   if(this.uploadStatus)
   {
    this.fileMsg="File uploaded successfully";
    setTimeout(()=>{this.fileMsg="";this.fileForm.reset();},3000)
    
   }
  }
  deleteFile(id: String) {
    // console.log(id);
    this.fileService.removeFile(id).subscribe().add(() =>
      this.fileService.getFile().subscribe((data) => this.fileInfo = data));
  }
  loadFile(id: String, fileLoc: string) {
    //fetch File Name Using Location
    const filename = fileLoc.substring(fileLoc.lastIndexOf('\\') + 1);

    this.fileService.loadFile(id).subscribe(response => {
      this.saveFile(response, filename)
    });
  }
  private saveFile(response: Blob, filename: string): void {
    const blob = new Blob([response], { type: response.type });

    // Create a temporary anchor element and trigger a click event to download the file
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = filename;
    downloadLink.click();

    // Clean up the temporary link
    window.URL.revokeObjectURL(downloadLink.href);
    downloadLink.remove();
  }


}
