import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { MenuBrazukasComponent } from './core/menu-conteudo/menu-brazukas.component';
import { ListConteudoComponent } from './list-conteudo/list-conteudo.component';
import { ClientesModule } from './Clientes/clientes.module';
import { ConteudoModule } from './form-conteudo/form-conteudo.module';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MenuBrazukasComponent,
    ListConteudoComponent,
  ],
  imports: [
    ClientesModule,
    ConteudoModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
