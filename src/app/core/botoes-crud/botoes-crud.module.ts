import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BotoesCrudComponent } from "./botoes-crud.component";

@NgModule({
    imports:[
        CommonModule
        ],
    declarations:[
       BotoesCrudComponent
    ],
    exports:[BotoesCrudComponent] 
})
export class BotoesCrudModule {}