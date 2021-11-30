import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConteudoComponent } from './form-conteudo/form-conteudo.component';
import { ListConteudoComponent } from './list-conteudo/list-conteudo.component';
import { MenuBrazukasComponent } from './menu-conteudo/menu-brazukas.component';
import { Page404Component } from './core/page-404/page-404.component';

const routes: Routes = [
  {path:'menu-brazukas', component: MenuBrazukasComponent},
  {path:'Form-conteudo', component: FormConteudoComponent},
  {path:'Form-conteudo/:codconteudo', component: FormConteudoComponent},
  {path:'ulti-posts'   , component: ListConteudoComponent},
  {path:'',redirectTo:'menu-brazukas', pathMatch: 'full'},
  {path:'**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
