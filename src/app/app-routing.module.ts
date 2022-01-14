import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConteudoComponent } from './form-conteudo/form-conteudo.component';
import { ListConteudoComponent } from './list-conteudo/list-conteudo.component';
import { MenuBrazukasComponent } from './core/menu-conteudo/menu-brazukas.component';
import { Page404Component } from './core/page-404/page-404.component';
import { TemaEnsinoComponent } from './Tema-ensino/tema-ensino.component';
import { ClienteComponent } from './Clientes/clientes.component';

const routes: Routes = [
  {path:'menu-brazukas', component: MenuBrazukasComponent},
  {path:'Form-conteudo', component: FormConteudoComponent},
  {path:'Form-conteudo/:codconteudo', component: FormConteudoComponent},
  {path:'ulti-posts'   , component: ListConteudoComponent},
  {path:'tema-ensino'   , component: TemaEnsinoComponent},
  {path:'clientes'   , component: ClienteComponent},
  {path:'',redirectTo:'menu-brazukas', pathMatch: 'full'},
  {path:'**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
