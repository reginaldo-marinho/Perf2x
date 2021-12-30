import {  Component, Input, OnInit } from "@angular/core";
import { FormGroup,FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "../shared/Loader/loader.service";

import { ConteudoDatalhes, ConteudoHeader } from "./conteudo-header";
import { ConteudoService } from "./conteudo.service";
@Component({
    templateUrl:'./form-conteudo.component.html',
    styleUrls:['./form-conteudo.component.css']
})
export class FormConteudoComponent implements OnInit {

  constructor(private conteudoService: ConteudoService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private louder: LoaderService){  }
  ngOnInit(){
      if (this.activatedRoute.snapshot.paramMap.get("codconteudo") != null){
          this.AlterarConteudo = true
          this.GetConteudoById(String(this.activatedRoute.snapshot.paramMap.get("codconteudo")))
      }
      this.CreateListConteudoHeader();
  }

  AlterarConteudo   : boolean = false;
  ListNivelTituloConteudo = this.conteudoService.NivelTituloConteudo;
  ListConteudoHeader!: ConteudoHeader[];
  ConteudoHeaderEncontrado?: ConteudoHeader;
  TextoParaFiltrar!: string;
  @Input() conteudoHeader!: ConteudoHeader;

  FormConteudo = this.fb.group({
    codigo:  ['', Validators.required],
    nivelConteudo:['',Validators.required],
    conteudoPai:  [''], 
    titulo:  ['', Validators.required],
    posicao: ['', Validators.required],
    conteudoDatalhes: this.fb.array([])
  })
  
  get conteudoDatalhesForm():FormArray{
     return this.FormConteudo.get('conteudoDatalhes') as FormArray 
  }

  AdicionarNovoDetalheVazio(){
    var DetalheGroup:FormGroup;
    DetalheGroup = this.fb.group({
        texto: ['', Validators.required],
        imagem: ['']
    })
    this.conteudoDatalhesForm.push(DetalheGroup!);
  }

  AdicionarNovoDetalheComValor(detalhe: ConteudoDatalhes){
    var DetalheGroup:FormGroup;
    DetalheGroup = this.fb.group({
      texto: [detalhe.texto],
      imagem: []
    })
    this.conteudoDatalhesForm.push(DetalheGroup!);
  }

  GetConteudoById(codigoConteudo :string): ConteudoHeader{
    this.conteudoService.getConteudoById(codigoConteudo).subscribe({
      next:(conteudo)=> {
         this.conteudoHeader = conteudo
         this.TransferirObjetoEncontradoParaFormConteudo();
      }
    })
    return this.conteudoHeader;
  }

  TransferirObjetoEncontradoParaFormConteudo(){
    this.FormConteudo.get('codigo')?.setValue(this.conteudoHeader.codigo)
    this.FormConteudo.get('nivelConteudo')?.setValue(this.conteudoHeader.nivelConteudo)
    this.FormConteudo.get('titulo')?.setValue(this.conteudoHeader.titulo)
    this.FormConteudo.get('posicao')?.setValue(this.conteudoHeader.posicao)
    this.conteudoHeader.conteudoDatalhes!.forEach( detalhe => this.AdicionarNovoDetalheComValor(detalhe))
  }

  TransferirFormConteudoParaObjeto(): ConteudoHeader{
    this.conteudoHeader = new ConteudoHeader();
    this.conteudoHeader.codigo        = String(this.FormConteudo.get('codigo')?.value);
    this.conteudoHeader.nivelConteudo = Number(this.FormConteudo.get('nivelConteudo')?.value);
    this.conteudoHeader.titulo        = String(this.FormConteudo.get('titulo')?.value);
    this.conteudoHeader.posicao       = Number(this.FormConteudo.get('posicao')?.value);
    this.conteudoHeader.conteudoPai!  = this.ConteudoHeaderEncontrado!.codigo;
    this.conteudoHeader.conteudoDatalhes = this.CriarListaDetalhe(this.conteudoHeader);
    return this.conteudoHeader;
  }

  CriarListaDetalhe(conteudoHeader:ConteudoHeader):ConteudoDatalhes[]{
    var detalhe  = new ConteudoDatalhes();
    var listaDetalhes = new Array() ;
    this.conteudoDatalhesForm.getRawValue().forEach(function(conteudoDetalhe,indice) {
      detalhe.codigo = conteudoHeader.codigo;
      detalhe.codigoHeader = conteudoHeader.codigo;
      detalhe.texto = conteudoDetalhe["texto"];
      detalhe.linha = indice+1
      listaDetalhes.push(detalhe)
    })
    return  listaDetalhes;
  }

  GetConteudoPai(event?:any){
    this.TextoParaFiltrar = event.target.value;
    this.ConteudoHeaderEncontrado = this.ListConteudoHeader.find(con => con.titulo.toLocaleUpperCase().indexOf(this.TextoParaFiltrar.toUpperCase()) > -1);   
  }

  CreateListConteudoHeader(){
    this.conteudoService.getConteudoHeader().subscribe({
      next:(conteudo)=> {
         this.ListConteudoHeader! = conteudo;
        },
        error:()=> console.log("Erro ao tentar criar lista de ConteudoHeader")
    });
  }

  SalvarConteudo(){ 
       this.conteudoHeader = this.TransferirFormConteudoParaObjeto();
       this.louder.OpenLoader();
       this.conteudoService.saveConteudo(this.conteudoHeader).subscribe(      
        {
          next:(conteudo:ConteudoHeader) => {
            //this.MensagemBoxComponent!.Mensagem = new ServiceMensagensInsert().CriarMensagemSucesso();
            // this.MensagemBoxComponent!.OpenMessageBox();
          },
          error: err => {
            //this.MensagemBoxComponent!.Mensagem = new ServiceMensagensInsert().CriarMensagemErro();
            //this.MensagemBoxComponent!.OpenMessageBox();
          }
        })
        this.louder.CloseLoader();
  }

    update(conteudo:any){
      conteudo.nivelConteudo = Number(conteudo.nivelConteudo) 
      for(let i in this.conteudoHeader!.conteudoDatalhes){
        conteudo.conteudoDatalhes[Number(i)].linha = Number(i)+1
        conteudo.conteudoDatalhes[Number(i)].codigo = this.conteudoHeader!.codigo
        conteudo.conteudoDatalhes[Number(i)].codigoHeader = this.conteudoHeader!.codigo
      }

      this.conteudoService.UpdateConteudo(conteudo).subscribe({
        next:() => {
          },
        error: err => console.log("Erro ao entar Alterar conteudo",err)
      })
    }

    delete(id:string):void{
      this.conteudoService.deleteConteudo(id!).subscribe({
          next:()=>{
              console.log("Conteudo Excluido");
          }
      })
  }
}