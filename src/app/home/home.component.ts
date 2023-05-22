import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fileForm!:FormGroup
 
  constructor(private formBuilder:FormBuilder) {
    
    
  }
  ngOnInit()
  {
    this.fileForm=this.formBuilder.group({
      fileData:new FormControl(null),
      uploadDate:new FormControl(new Date()),
      })
  }
  upload( )
  {
  
  }
}
