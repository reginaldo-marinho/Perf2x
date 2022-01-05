import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoaderService{
    OpenLoader(){
        var loader = document.getElementById("quadro-fundo-loader");
        loader?.classList.remove("display-none");
        loader?.classList.add("quadro-fundo");
    }
    CloseLoader(){
        setTimeout(()=>{
            var loader = document.getElementById("quadro-fundo-loader");
            loader?.classList.remove("quadro-fundo");
            loader?.classList.add("display-none");
        },1000)
    }
}