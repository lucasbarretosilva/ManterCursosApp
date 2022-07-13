import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/Models/Categoria.model';
import { Curso } from 'src/app/Models/Curso.model';
import { CategoriasService } from 'src/app/Services/categorias.service';
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
  cat: Categoria[] = [];
  constructor(
    private cursosService: CursosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private categoriasService: CategoriasService

  ) { this.formulario = new FormGroup({
    descricao: new FormControl(null, Validators.required),
    dataInicio: new FormControl(null, Validators.required),
   
    dataTermino: new FormControl(null, Validators.required),
    qtdAlunos: new FormControl(null),
    categoriaId: new FormControl(null),

  });}

 

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const curso: Curso = this.formulario.value;

      if (this.id && this.id > 0) {
        curso.cursoId = this.id;

        this.cursosService.atualizar(curso).subscribe(() => {
          this.toastr.success('Dados atualizados', 'Sucesso!');
          this.router.navigate(['cursos']);
        },
        (error)=>{
          console.log(error)
          this.toastr.error(error.error.message);
        });
      } else {
        this.cursosService.salvar(curso).subscribe(
          
          (resposta) => {
          this.id = resposta.cursoId;
          this.toastr.success(
            'Cadastro Realizado!',
            'Sucesso!'
          );
        },
        (error)=>{
          console.log(error)
          this.toastr.error(error.error.message);
        });
      }
    } else {
      this.toastr.error('Preencha os campos obrigatórios', 'Atenção!');
    }
  }


  ngOnInit(): void {
    this.obterTodos();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.cursosService.obterPorId(this.id).subscribe((resultado) => {
        this.formulario.patchValue(resultado);
        
        
      });
    });
    
  }

  obterTodos(): void{
    this.categoriasService.obterCategorias().subscribe(
      (resposta)=>{
        this.cat = resposta;
        
        
       
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }

  

}
