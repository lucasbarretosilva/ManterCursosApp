import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './Components/cursos/cursos.component';
import { FormCursoComponent } from './Components/cursos/form-curso/form-curso.component';
import { HomeComponent } from './Components/home/home.component';
import { LogComponent } from './Components/log/log.component';

const routes: Routes = [
  {path: 'cursos', component: CursosComponent},
  {path: 'curso/adicionar', component:FormCursoComponent},
  {path: 'curso/editar/:id', component:FormCursoComponent},
  {path: '', component: HomeComponent},
  {path: 'log', component: LogComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
