import { FormConteudoComponent } from "./form-conteudo.component";
import { MensagemBoxComponent } from "../mensagem-box/mensagem-box.component";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from "../Loader/loader.component";



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
        MensagemBoxComponent
    ],
    exports:[FormConteudoComponent] 

})
export class ConteudoModule {}