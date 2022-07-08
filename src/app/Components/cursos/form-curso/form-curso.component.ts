import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/Models/Curso.model';
import { CursosService } from 'src/app/Services/cursos.service';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent implements OnInit {
  formulario: any;
  id: any;
  curso: Curso | undefined;
  constructor(
    private cursosService: CursosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService

  ) { this.formulario = new FormGroup({
    descricao: new FormControl(null, Validators.required),
    dataInicio: new FormControl(null, Validators.required),
   
    dataTermino: new FormControl(null, Validators.required),
    qtdAlunos: new FormControl(null, Validators.required),

  });}

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const curso: Curso = this.formulario.value;

      if (this.id && this.id > 0) {
        curso.cursoId = this.id;

        this.cursosService.atualizar(curso).subscribe(() => {
          this.toastr.success('Dados atualizados', 'Sucesso!');
          this.router.navigate(['cursos']);
        });
      } else {
        this.cursosService.salvar(curso).subscribe(
          
          (resposta) => {
          this.id = resposta.cursoId;
          this.toastr.success(
            'Cadastro Realizado! Clique em Conteúdos para continuar o cadastro ',
            'Sucesso!'
          );
        },
        (error)=>{
          console.log(error)
          this.toastr.error(error.error.message);
        });
      }
    } else {
      this.toastr.error('Preencha todos os campos', 'Atenção!');
    }
  }


  ngOnInit(): void {
  }

}
