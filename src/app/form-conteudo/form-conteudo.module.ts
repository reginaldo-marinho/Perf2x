import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { FormConteudoComponent } from "./form-conteudo.component";
import { MensagemBoxComponent } from "../shared/mensagem-box/mensagem-box.component";
import { LoaderComponent } from "../shared/Loader/loader.component";
import { InputImagemComponent } from "../shared/input-imagem/input-imagem.component";
import { InputTextAreaComponent } from "../shared/input-text-area/input-text-area.component";

@NgModule({
    imports:[
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    declarations:[
        FormConteudoComponent,
        LoaderComponent,
        MensagemBoxComponent,
        InputImagemComponent,
        InputTextAreaComponent
    ],
    exports:[FormConteudoComponent] 

})
export class ConteudoModule {}