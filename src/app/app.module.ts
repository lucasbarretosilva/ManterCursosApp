import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CursosComponent } from './Components/cursos/cursos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CursosService } from './Services/cursos.service';
import { FormCursoComponent } from './Components/cursos/form-curso/form-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasService } from './Services/categorias.service';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CursosComponent,
    FormCursoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
    
  ],
  providers: [HttpClientModule, CursosService, CategoriasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
