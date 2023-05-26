import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FileInfo } from './home.component';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }

  postFile(Data:any)
  {
      return this.http.post('http://localhost:8080/file/upload',Data,{reportProgress:true});
  }
  getFile()
  {
      return this.http.get<FileInfo[]>('http://localhost:8080/file/files');
  }
  removeFile(id:String)
  {
     return this.http.delete(`http://localhost:8080/file/delete/${id}`);
}
}
