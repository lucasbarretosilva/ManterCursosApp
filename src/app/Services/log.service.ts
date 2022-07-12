import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../Models/Log.model';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  url = 'https://localhost:7181/api/Logs';


  obterTodos():Observable<Log[]>{
    return this.http.get<Log[]>(this.url);
  }

}
