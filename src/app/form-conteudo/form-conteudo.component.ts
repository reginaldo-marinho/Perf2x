
import {  Component, Input, OnInit } from "@angular/core";
import { FormGroup,FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "../shared/Loader/loader.service";

import { ConteudoDatalhes, ConteudoHeader } from "./conteudo-header";
import { ConteudoService } from "./conteudo.service";
@Component({
    selector: 'form-conteudo',
    templateUrl:'./form-conteudo.component.html',
    styleUrls:['./form-conteudo.component.css']
})
export class FormConteudoComponent implements OnInit {

  AlterarConteudo   : boolean = false;
  AddConteudoAlteracao : boolean = false;
  Messagem : string = "Conteudo  salvo com sucesso!"

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

  @Input()  conteudoHeader!: ConteudoHeader;

  FormConteudo = this.fb.group({
    codigo:  ['', Validators.required],
    nivelConteudo:['', Validators.required],
    titulo:  ['', Validators.required],
    posicao: ['', Validators.required],
    conteudoDatalhes: this.fb.array([])
  })

  constructor(private conteudoService: ConteudoService, private activatedRoute: ActivatedRoute, 
              private fb: FormBuilder, private louder: LoaderService){  }
  
  ngOnInit(){
    const id =  this.activatedRoute.snapshot.paramMap.get("codconteudo");
    if(id != null){
     this.AlterarConteudo = true
     this.GetConteudoById(id)
    }
  }

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
            this.conteudoHeader;
          },
          error: err => console.log("Erro ao entar salvar conteudo",err)
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
