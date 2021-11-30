import { Component } from "@angular/core";
import { ServiceMensagensInsert } from "./mensagem.service"
@Component({
    selector:"message-box",
    templateUrl:"mensagem-box.component.html",
    styleUrls:["./mensagem-box.component.css"]
    
})
export class MensagemBoxComponent {
    
    constructor(private mensagem: ServiceMensagensInsert){}

    Mensagem?:string = "";
    OpenMessageBox(){
        var msg = document.getElementById("messagebox");
        msg?.classList.remove("message-box-end");
        msg?.classList.add("message-box");
        this.Mensagem = this.mensagem.CriarMensagemSucesso();
   }

    CloseMessageBox(){
        var msg = document.getElementById("messagebox")
        msg?.classList.remove("message-box");
        msg?.classList.add("message-box-end");
      }
}
