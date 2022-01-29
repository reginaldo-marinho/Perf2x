import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClienteComponent } from "./clientes.component";
import { BotoesCrudModule } from "../core/botoes-crud/botoes-crud.module";

@NgModule({
    imports:[
        CommonModule,
        BotoesCrudModule
        ],
    declarations:[
        ClienteComponent
    ],
    exports:[ClienteComponent] 
})
export class ClientesModule {}