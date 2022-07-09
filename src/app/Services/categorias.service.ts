import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Categoria } from '../Models/Categoria.model';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url = 'https://localhost:7181/api/Categorias';
  constructor(private http: HttpClient) { }

  obterCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url);
  }



}
