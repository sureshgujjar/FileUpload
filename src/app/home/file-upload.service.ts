import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { FileInfo } from './home.component';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }

  postFile(Data:any)
  {
    const request = new HttpRequest('POST','http://localhost:8080/file/upload',Data,{reportProgress:true});
    return this.http.request(request);
      // return this.http.post('http://localhost:8080/file/upload',Data,{reportProgress:true});
  }
  getFile()
  {
      return this.http.get<FileInfo[]>('http://localhost:8080/file/files');
  }
  removeFile(id:String)
  {
     return this.http.delete(`http://localhost:8080/file/delete/${id}`);
  }
  loadFile(id:String)
  {
    return this.http.get(`http://localhost:8080/file/load/${id}`,{responseType:'blob'});
  }
}
