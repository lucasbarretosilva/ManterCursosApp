import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Log } from 'src/app/Models/Log.model';
import { LogService } from 'src/app/Services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

   logs: any[] = [];


  constructor(private logService: LogService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obterTodos();
  }


  obterTodos(): void{
    this.logService.obterTodos().subscribe(
      (resposta)=>{
        this.logs = resposta;
        
        
       
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }


}
