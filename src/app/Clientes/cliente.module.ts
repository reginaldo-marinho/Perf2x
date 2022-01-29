import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClienteComponent } from "./clientes.component";
import { BotoesCrudComponent } from "../core/botoes-crud/botoes-crud.component";
@NgModule({
    imports:[
        CommonModule,
        ],
    declarations:[
        ClienteComponent,
        BotoesCrudComponent
    ],
    exports:[ClienteComponent] 
})
export class ClienteModule {}