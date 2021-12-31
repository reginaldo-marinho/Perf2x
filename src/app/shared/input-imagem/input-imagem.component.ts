import { Component } from "@angular/core";

@Component({

    selector:"input-imagem-component",
    template: `<input type="file" class="form-control" name="imagem" formcontrolname="imagem" (change) = ValidarArquivoImagem($event)>`
})
export class InputImagemComponent{

}