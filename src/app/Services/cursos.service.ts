import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Curso } from '../Models/Curso.model';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  urlAtivos = 'https://localhost:7181/api/Cursos/cursosAtivos';
  url = 'https://localhost:7181/api/Cursos';
  urlDelete = 'https://localhost:7181/api/Cursos/DeleteLogico'

  constructor(private http: HttpClient) { }

  obterTodos():Observable<Curso[]>{
    return this.http.get<Curso[]>(this.urlAtivos);
  }

   
  atualizar(c: Curso): Observable<any> {
    return this.http.put<Curso>(`${this.url}/${c.cursoId}`, c, httpOptions);
  } 

  DeleteLogico(cursoId: number): Observable<any> {
    return this.http.put<Curso>(`${this.urlDelete}/${cursoId}`, httpOptions);
  } 

  salvar(c: Curso): Observable<any> {
    return this.http.post<Curso>(this.url, c, httpOptions);
  } 

  obterPorId(id:number):Observable<Curso>{
    return this.http.get<Curso>(`${this.url}/${id}`);
  }

}
