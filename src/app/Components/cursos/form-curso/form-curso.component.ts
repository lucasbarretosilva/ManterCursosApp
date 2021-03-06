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
    categoriaId: new FormControl(null, Validators.required),

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
          this.router.navigate(['cursos']);
        },
        (error)=>{
          console.log(error)
          this.toastr.error(error.error.message);
        });
      }
    } else {
      this.toastr.error('Preencha os campos obrigat??rios * ', 'Aten????o!');
    }
  }


  ngOnInit(): void {
    this.obterTodos();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.cursosService.obterPorId(this.id).subscribe((resultado) => {
        this.formulario.patchValue(resultado);
        this.formulario.controls['dataInicio'].setValue(this.converterData(resultado.dataInicio));
        this.formulario.controls['dataTermino'].setValue(this.converterData(resultado.dataTermino));
        
        
      });
    });
    
  }

  converterData(date:any):Date{
       return date.split('T')[0]
  }

  obterTodos(): void{
    this.categoriasService.obterCategorias().subscribe(
      (resposta)=>{
        this.cat = resposta;

        
        
       
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Aten????o!');
      }
    )
  }

  

}
