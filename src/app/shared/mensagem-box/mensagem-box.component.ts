
import { Component, Injectable } from "@angular/core";

@Component({
    selector:"message-box",
    templateUrl:"mensagem-box.component.html",
    styleUrls:["./mensagem-box.component.css"]
    
})

@Injectable({
    providedIn: 'root'
  })
export  class  MensagemBoxComponent {
    Mensagem?:string;
}
