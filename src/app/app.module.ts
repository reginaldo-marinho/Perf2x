import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClienteModule } from './Clientes/cliente.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { MenuBrazukasComponent } from './core/menu-conteudo/menu-brazukas.component';
import { ListConteudoComponent } from './list-conteudo/list-conteudo.component';
import { ConteudoModule } from './form-conteudo/form-conteudo.module';
import { BotoesCrudComponent } from './core/botoes-crud/botoes-crud.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MenuBrazukasComponent,
    ListConteudoComponent,
    BotoesCrudComponent
  ],
  imports: [
    ClienteModule,
    ConteudoModule,
    AppRoutingModule,
    BrowserModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
