import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fileForm!:FormGroup
  file!:FileList
  constructor(private formBuilder:FormBuilder) {
    
    
  }
  ngOnInit()
  {
    this.fileForm=this.formBuilder.group({
      fileName:new FormControl(''),
      uploadDate:new FormControl(new Date()),
      })
  }
  selectFile(event:any)
{
  this.file=event.target.files.item(0);
  
}
upload()
{
  console.log(this.file);
  console.log(this.fileForm.getRawValue());
}

}
