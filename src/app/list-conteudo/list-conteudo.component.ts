import { Component, OnInit } from "@angular/core";
import { ConteudoService } from "../form-conteudo/conteudo.service";
import { ConteudoHeader } from "../form-conteudo/conteudo-header";

@Component({
    selector:"app-conteudo-list",
    templateUrl:"./list-conteudo.component.html",
    styleUrls:["./list-conteudo.component.css"]
})
export class ListConteudoComponent implements OnInit
{
    ListaConteudo:ConteudoHeader[] = []
    titulo = "Conteudos Brazukas"
    
    constructor(private conteudo: ConteudoService){}
   
    ngOnInit(): void {
        this.get();
    }
    
    get():void{
        this.conteudo.getAllConteudo().subscribe({
            next: con => {this.ListaConteudo = con},
            error: err => console.log("Erro",err)
            }
        )
    }
    
    GetLike(texto: string):void{
        this.conteudo.getConteudoByText(texto).subscribe({
            next: conteudo => {this.ListaConteudo = conteudo}
        })
    }

    delete(id:string|undefined):void{
        this.conteudo.deleteConteudo(id!).subscribe({
            next:()=>{
                this.get();
                console.log("Conteudo Excluido");
            }
        })
    }
}