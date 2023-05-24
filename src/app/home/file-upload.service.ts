import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }

  postFile(Data:any)
  {
      return this.http.post('http://localhost:8080/file/upload',Data,{reportProgress:true});
  }
}
