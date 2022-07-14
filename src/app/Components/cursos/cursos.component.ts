import { Component, OnInit } from '@angular/core';

import { CursosService } from 'src/app/Services/cursos.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/Models/Curso.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { Categoria } from 'src/app/Models/Categoria.model';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  modalOptions: NgbModalOptions = {
    size: 'md',
    centered:true
  };

  ativaBusca = true;
  ativaLimpar = false;
   
  cursos: Curso[] = [];
  categorias: Categoria[]=[];
  cursosFiltrados: any = [];
  private _filtroLista: string = '';
  public filtroData: string = '';
  
  constructor(private cursoService: CursosService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private categoriaService: CategoriasService

   ) { }

  ngOnInit(): void {
    this.obterTodos();
    this.obterCat();
    
  }

  comeco!: Date;
  final!: Date;

  public get filtroLista(){
    return this._filtroLista
  }

  public set filtroLista(value: string){
   this._filtroLista = value;
   this.cursosFiltrados = this.filtroLista ? this.filtrarCursos(this.filtroLista) : this.cursos;
 }

 filtrarCursos(filtrarPor: string): any{
   filtrarPor = filtrarPor.toLocaleLowerCase();
   return this.cursos.filter(
     (cursos: {descricao:string}) => cursos.descricao.toLocaleLowerCase().indexOf(filtrarPor)!== -1
     
    );
 }

  abrirModal(htmlModal:any,id:number) {
    this.modalService.open(htmlModal,this.modalOptions).result.then(
      (resposta) => {
        if(resposta){
          this.deletar(id);
        }
      }
    )
  }


  deletar(id:any):void{
    this.cursoService.DeleteLogico(id).subscribe(
      ()=>{
        this.toastr.success('', 'Registro Deletado!');
        this.obterTodos();
      },
      (error)=>{
        this.toastr.error('Cursos já realizados não podem ser excluídos. Cod (D1)', 'Atenção!');
      }
    )
  }
 

  obterTodos(): void{
    this.cursoService.obterTodos().subscribe(
      (resposta)=>{
        this.cursos = resposta;
        this.cursosFiltrados= this.cursos;
        
       
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }

  obterCat(): void{
    this.categoriaService.obterCategorias().subscribe(
      (resposta)=>{
        this.categorias = resposta;
        
        
       
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }

  FiltraCategoria(id: number): Categoria{
    return this.categorias.find(cat => cat.categoriaId == id)!;
  }

  FiltraPeriodo(form: NgForm){
  
    let inicio = form.controls["pegaComeco"].value;
    let final = form.controls["pegaFinal"].value;
    this.ativaLimpar = true;
    this.ativaBusca = false;



    if(inicio && inicio.length && final && final.length){
    
      this.cursosFiltrados =
      this.cursos.filter(c => new Date(c.dataInicio) >= new Date(inicio)
      && new Date(c.dataInicio).setDate(new Date(c.dataInicio).getDate()-1) <= new Date(final).getTime());
      return;
    }

    if(inicio && inicio.length){
      console.log(inicio);
      this.cursosFiltrados =
      this.cursos.filter(c => new Date(c.dataInicio) >= new Date(inicio));
    }
    else{
      this.toastr.warning('Data de início não preenchida, para uma busca mais precisa, preeencha a data inicial !', 'Dados não refinados');
    }

    if(final && final.length){
      console.log(final);
      this.cursosFiltrados =
      this.cursos.filter(c => new Date(c.dataTermino) <= new Date(final));
    }
    else{
      this.toastr.warning('Preencha a data final para um filtro mais preciso !', 'Dados não refinados');
    }
  }

  limpar(form: NgForm){
    form.resetForm();
    this.cursosFiltrados = this.cursos;
    this.ativaLimpar = false;
    this.ativaBusca = true;
  }

  converterData(date:any):Date{
    return date.split('T')[0]
}


}
   
     

    




