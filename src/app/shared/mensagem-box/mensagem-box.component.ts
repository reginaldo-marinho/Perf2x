
import { Component } from "@angular/core";

@Component({
    selector:"message-box",
    templateUrl:"mensagem-box.component.html",
    styleUrls:["./mensagem-box.component.css"]
    
})


export  class  MensagemBoxComponent {
    Mensagem?:string;
    OpenMessageBox(){
        var msg = document.getElementById("messagebox");
        msg?.classList.remove("message-box-end");
        msg?.classList.add("message-box");
      }
      CloseMessageBox(){
        var msg = document.getElementById("messagebox")
        msg?.classList.remove("message-box");
        msg?.classList.add("message-box-end");
      }
}
