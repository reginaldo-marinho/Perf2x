import {  AfterViewInit, Component, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "../shared/Loader/loader.service";
import { ConteudoDatalhes, ConteudoHeader } from "./conteudo-header";
import { ConteudoService } from "./conteudo.service";
@Component({
    templateUrl:'./form-conteudo.component.html',
    styleUrls:['./form-conteudo.component.css']
})

export class FormConteudoComponent implements OnInit{

  constructor(private conteudoService: ConteudoService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private louder: LoaderService){  }
  ngOnInit(){
      if (this.activatedRoute.snapshot.paramMap.get("codconteudo") != null){
          this.AlterarConteudo = true
          this.GetConteudoById(String(this.activatedRoute.snapshot.paramMap.get("codconteudo")))
      }
      this.CarregarEventosBtnCrud()
  }

  CarregarEventosBtnCrud(){
    document.getElementById("btn-adicionar")?.addEventListener("click",() => this.Salvar());
  }

  AlterarConteudo   : boolean = false;
  ListNivelTituloConteudo = this.conteudoService.NivelTituloConteudo;
  ListConteudoHeader!: ConteudoHeader[];
  ConteudoHeaderEncontrado?: ConteudoHeader;
  TextoParaFiltrar!: string;
  @Input() conteudoHeader!: ConteudoHeader;

  formConteudo = this.fb.group({
    codigo:  ['', Validators.required],
    nivelConteudo:['',Validators.required],
    conteudoPai:  [''], 
    titulo:  ['', Validators.required],
    posicao: ['', Validators.required],
    conteudoDatalhes: this.fb.array([this.fb.group({texto:['']})])  
  })

  descricaoImagem = 
  { nome:'',
    tamanho:'',
    ultimaModificacao:''
  }

  get conteudoDatalhes(){
     return this.formConteudo.get("conteudoDatalhes") as FormArray 
  }

  CriarElementoTexto(){
    this.conteudoDatalhes.push(
      this.fb.group({
        texto: ['', Validators.required]
      })
    )
  }

  CriarElementoImagem(){
    this.conteudoDatalhes.push(
      this.fb.group({
      imagem:['', Validators.required]
      })
    );
  }

  TratarArquivoImagem(e:any){
    let Imagem = e.target.files[0] as File

    this.descricaoImagem['nome'] = Imagem.name
    this.descricaoImagem['tamanho'] = Imagem.size.toString()
    this.descricaoImagem['ultimaModificacao'] = Imagem.lastModified.toString()
  
    let img =  document.getElementById("img-"+e.target.id)  as HTMLImageElement
    img.src = URL.createObjectURL(Imagem);

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
    this.formConteudo.get('codigo')?.setValue(this.conteudoHeader.codigo)
    this.formConteudo.get('nivelConteudo')?.setValue(this.conteudoHeader.nivelConteudo)
    this.formConteudo.get('titulo')?.setValue(this.conteudoHeader.titulo)
    this.formConteudo.get('posicao')?.setValue(this.conteudoHeader.posicao)
    //this.conteudoHeader.conteudoDatalhes!.forEach( detalhe => this.AdicionarNovoDetalheComValor(detalhe))
  }

  TransferirFormConteudoParaObjeto(): ConteudoHeader{
    this.conteudoHeader = new ConteudoHeader();
    this.conteudoHeader.codigo        = String(this.formConteudo.get('codigo')?.value);
    this.conteudoHeader.nivelConteudo = Number(this.formConteudo.get('nivelConteudo')?.value);
    this.conteudoHeader.titulo        = String(this.formConteudo.get('titulo')?.value);
    this.conteudoHeader.posicao       = Number(this.formConteudo.get('posicao')?.value);
    this.ConteudoHeaderEncontrado! == undefined ? this.conteudoHeader.conteudoPai = '' : this.conteudoHeader.conteudoPai = this.ConteudoHeaderEncontrado!.codigo;
    this.conteudoHeader.conteudoDatalhes = this.CriarListaDetalhe(this.conteudoHeader);

    return this.conteudoHeader;
  }

  CriarListaDetalhe(conteudoHeader:ConteudoHeader):ConteudoDatalhes[]{
    var detalhe  = new ConteudoDatalhes();
    var listaDetalhes = new Array() ;
    
    this.conteudoDatalhes.getRawValue().forEach(function(_conteudo,indice) {
      detalhe.codigo = conteudoHeader.codigo;
      detalhe.codigoHeader = conteudoHeader.codigo;
      detalhe.texto = _conteudo["texto"];
      detalhe.linha = indice+1
      listaDetalhes.push(detalhe )
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

  Salvar(){ 
       this.conteudoHeader = this.TransferirFormConteudoParaObjeto();
       this.louder.OpenLoader();
       this.conteudoService.saveConteudo(this.conteudoHeader).subscribe(      
        {
          next:() => {
          },
          error: err => {
          }
        })
        this.Upload();
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

    Upload(){
       document.getElementsByName("imagem").forEach(
        (imagem) => {
          let img = imagem as HTMLInputElement
          let file = img.files?.item(0) as File
          this.conteudoService.uploadImagem(file);
      })
    }
}