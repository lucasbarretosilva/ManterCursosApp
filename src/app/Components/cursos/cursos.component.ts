import { Component, OnInit } from '@angular/core';

import { CursosService } from 'src/app/Services/cursos.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/Models/Curso.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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



  cursos: Curso[] = [];
  
  constructor(private cursoService: CursosService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
   ) { }

  ngOnInit(): void {
    this.obterTodos();
    
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
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }
 

  obterTodos(): void{
    this.cursoService.obterTodos().subscribe(
      (resposta)=>{
        this.cursos = resposta;
        
        
       
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }
}
