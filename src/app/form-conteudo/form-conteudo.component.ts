
import {  Component, Input, OnInit } from "@angular/core";
import { FormGroup,FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "../shared/Loader/loader.service";

import { ConteudoDatalhes, ConteudoHeader } from "./conteudo-header";
import { ConteudoService } from "./conteudo.service";
import { MensagemBoxComponent } from "../shared/mensagem-box/mensagem-box.component";
import { IMensagemNiveis } from "../shared/mensagem-box/mensagem.service";
import { ServiceMensagensInsert } from "../shared/mensagem-box/mensagem.service";
@Component({
    selector: 'form-conteudo',
    templateUrl:'./form-conteudo.component.html',
    styleUrls:['./form-conteudo.component.css']
})
export class FormConteudoComponent implements OnInit {

  constructor(private conteudoService: ConteudoService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private louder: LoaderService){  }

  ngOnInit(){
      const id =  this.activatedRoute.snapshot.paramMap.get("codconteudo");
      if(id != null){
          this.AlterarConteudo = true
          this.GetConteudoById(id)
      }
      this.CreateListConteudoHeader();
  }

  AlterarConteudo   : boolean = false;
  AddConteudoAlteracao : boolean = false;
  MensagemBoxComponent?: MensagemBoxComponent;
  MesagemNivel?: IMensagemNiveis;
  ListConteudoHeader!: ConteudoHeader[];

  @Input() conteudoHeader!: ConteudoHeader;

  TipoConteudo = [{nivel:"Nivel H1",
                  valor:1},
                  {nivel:"Nivel H2",
                  valor:2},
                  {nivel:"Nivel H3",
                  valor:3},
                  {nivel:"Nivel H4",
                  valor:4},
                  {nivel:"Nivel H5",
                  valor:5},
                  {nivel:"Nivel H6",
                  valor:6}]

  FormConteudo = this.fb.group({
    codigo:  ['', Validators.required],
    nivelConteudo:['', Validators.required],
    titulo:  ['', Validators.required],
    posicao: ['', Validators.required],
    conteudoDatalhes: this.fb.array([])
  })
  
 
  get conteudoDatalhes():FormArray{
     return this.FormConteudo.get('conteudoDatalhes') as FormArray 
  }

  AddConteudoDetalhe(detalhe: ConteudoDatalhes|any){

    var DetalheGroup:FormGroup;

    if(detalhe != undefined){
      DetalheGroup = this.fb.group({
        texto: [detalhe.texto],
        imagem: []
      })
    }else
    {
      DetalheGroup = this.fb.group({
        texto: ['', Validators.required],
        imagem: ['']
      })
    }
   
    this.conteudoDatalhes.push(DetalheGroup!);
  }

  GetConteudoById(id : number|string): ConteudoHeader{
    this.conteudoService.getConteudoById(id).subscribe({
      next:(conteudo)=> {
         this.conteudoHeader = conteudo
         this.TransferObsejectHeader()
      }
    })
    return this.conteudoHeader;
  }
  GetConteudoPai(texto:string){
    this.ListConteudoHeader.find(con => con.titulo.search(`/${texto}/a`))
  }

  CreateListConteudoHeader(){
    
    this.conteudoService.getConteudoHeader().subscribe({
      next:(conteudo)=> {
         this.ListConteudoHeader! = conteudo;
        },
        error:()=> console.log("Erro ao tentar criar lista de ConteudoHeader")
    });
  }

TransferObsejectHeader(){
  this.FormConteudo.get('codigo')?.setValue(this.conteudoHeader.codigo)
  this.FormConteudo.get('nivelConteudo')?.setValue(this.conteudoHeader.nivelConteudo)
  this.FormConteudo.get('titulo')?.setValue(this.conteudoHeader.titulo)
  this.FormConteudo.get('posicao')?.setValue(this.conteudoHeader.posicao)

  this.conteudoHeader.conteudoDatalhes!.forEach( cont => this.AddConteudoDetalhe(cont))
  }

  save(conteudo:ConteudoHeader) {
     this.louder.OpenLoader();
      conteudo.nivelConteudo = Number(conteudo.nivelConteudo) 
      for(let i in conteudo.conteudoDatalhes){
        conteudo.conteudoDatalhes[Number(i)].linha = Number(i)+1
        conteudo.conteudoDatalhes[Number(i)].codigo =conteudo.codigo
        conteudo.conteudoDatalhes[Number(i)].codigoHeader = conteudo.codigo
      }
       this.conteudoService.saveConteudo(conteudo).subscribe(      
        {
          next:(conteudo:ConteudoHeader) => {
            this.MensagemBoxComponent!.Mensagem = new ServiceMensagensInsert().CriarMensagemSucesso();
            this.MensagemBoxComponent!.OpenMessageBox();
          },
          error: err => {
            this.MensagemBoxComponent!.Mensagem = new ServiceMensagensInsert().CriarMensagemErro();
            this.MensagemBoxComponent!.OpenMessageBox();
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

    delete(id:string|undefined):void{
      this.conteudoService.deleteConteudo(id!).subscribe({
          next:()=>{
              console.log("Conteudo Excluido");
          }
      })
  }
}
