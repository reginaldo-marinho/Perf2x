import {  AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormGroup,FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "../shared/Loader/loader.service";
import { ConteudoDatalhes, ConteudoHeader } from "./conteudo-header";
import { ConteudoService } from "./conteudo.service";
@Component({
    templateUrl:'./form-conteudo.component.html',
    styleUrls:['./form-conteudo.component.css']
})
export class FormConteudoComponent implements OnInit,AfterViewInit{

  constructor(private conteudoService: ConteudoService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private louder: LoaderService){  }
  ngOnInit(){

      if (this.activatedRoute.snapshot.paramMap.get("codconteudo") != null){
          this.AlterarConteudo = true
          this.GetConteudoById(String(this.activatedRoute.snapshot.paramMap.get("codconteudo")))
      }
  }
  ngAfterViewInit(){
    this.CriarElementoDetalheTipoTextArea()  
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
    conteudoDatalhes: this.fb.array([this.fb.group({texto:[]})])
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
  CriarElementoTexto(){
    this.CriarElementoDetalheTipoTextArea();
    this.MapearTextAreaTextoVazioFormGroup();
  }

  CriarElementoImagem(){
    this.CriarComponenteInputImagem();
    this.MapearInputImagemVazioFormGroup();
  }

  CriarDivInputDetalhes() :Node{
      let  DivInputDetalhes = document.createElement("div");
      DivInputDetalhes.setAttribute("class","mb-3 me-1 ms-1");
      return DivInputDetalhes;
  }
  
  CriarDivInputImagem() :Node{
    let  DivInputDetalhes = document.createElement("div");
    DivInputDetalhes.setAttribute("class","mb-3 me-1 ms-1");
    DivInputDetalhes.setAttribute("id",String(document.getElementsByTagName("img").length+1))
    return DivInputDetalhes;
  }

  CriarElementoDetalheTipoTextArea(){
    let AreaDeConteudo = document.getElementById("area-de-conteudo")
    let div = this.CriarDivInputDetalhes();
    div.appendChild(CriarTextArea());
    AreaDeConteudo?.appendChild(div);
   
    function CriarTextArea():Node {
      let TextArea = document.createElement("textarea");
      TextArea.setAttribute("class","form-control");
      TextArea.setAttribute("id","textarea-conteudo")
      TextArea.setAttribute("name","imagem");
      TextArea.setAttribute("formControlName","texto");
      TextArea.setAttribute("style","height: 200px;");
      return TextArea;
    }
  }
  
  CriarComponenteInputImagem(){
    let AreaDeConteudo = document.getElementById("area-de-conteudo")
    let div = this.CriarDivInputImagem();
    let Imagem = document.createElement("input");
    Imagem.setAttribute("type","file");
    Imagem.setAttribute("class","form-control");
    Imagem.setAttribute("name","imagem");
    Imagem.setAttribute("formControlName","imagem");
    Imagem.setAttribute("accept","image/png, image/jpeg"  )
    Imagem.setAttribute("change","TratarArquivoImagem($event)");
    Imagem.addEventListener("change",this.TratarArquivoImagem)
    div.appendChild(Imagem);
    AreaDeConteudo?.appendChild(div);
    Imagem.click(); 
  }

  TratarArquivoImagem(event: any){
    let IdElementeEmFoco = event.target.parentNode.id;
    let IdNovoElemento = String(document.getElementsByTagName("img").length+1);
    let DivMiniaturaImagem = document.getElementById("div-miniatura-img"+IdElementeEmFoco)
    
    if(DivMiniaturaImagem){
       DivMiniaturaImagem!.remove();
      let AreaDeConteudoExistente = document.getElementById(IdElementeEmFoco)
      AreaDeConteudoExistente?.appendChild(CriarDivCardImagem(IdElementeEmFoco))
    }
    else{
      let AreaDeConteudoNovo = document.getElementById(IdNovoElemento)
      AreaDeConteudoNovo?.appendChild(CriarDivCardImagem(IdNovoElemento))
    }
    function CriarDivCardImagem(posicaoId:string):Node{
      let  DivQuadroInformacao = document.createElement("div");
      DivQuadroInformacao.setAttribute("class","desc-input");
      DivQuadroInformacao.setAttribute("id","div-miniatura-img"+posicaoId);
      DivQuadroInformacao?.appendChild(CriarMiniaturaImagem(event));
      DivQuadroInformacao.appendChild(CriarDivDetalhesImagem());
      return DivQuadroInformacao;
    }

    function CriarMiniaturaImagem(event: any):Node{
      let imagem = document.createElement("img");
      imagem.setAttribute("class","desc-input-img");
      imagem.src = URL.createObjectURL(event.target.files[0]);
      return imagem;
    }

    function CriarDivDetalhesImagem(){
      let  DivDescricaoImagem = document.createElement("div");
      DivDescricaoImagem.setAttribute("class","desc-input-img-details border");
      DivDescricaoImagem.appendChild(CriarListDescricaoImagem()!);
      return DivDescricaoImagem;
    }
    function CriarListDescricaoImagem(){
      let ul = document.createElement("ul")
      ul.setAttribute("style","list-style: none; margin-bottom: 0px");
      let TamanhoImagem = document.createElement("li");
      let UltimaModific = document.createElement("li");
      TamanhoImagem.textContent = `Tamanho: ${event.target.files[0].size} bytes`
      UltimaModific.textContent = `Ultima Modificação:${event.target.files[0].lastModifiedDate}`

      ul.appendChild(TamanhoImagem)
      ul.appendChild(UltimaModific)
      return ul;
    }
  }
  
  CreateInputeTextLinkYoutube(){
    let AreaDeConteudo = document.getElementById("area-de-conteudo")
    let TexYoutube = document.createElement("input");
    let div = this.CriarDivInputDetalhes();
    
    TexYoutube.setAttribute("class","form-control");
    TexYoutube.setAttribute("type","text")
    TexYoutube.setAttribute("name","idvideoyoutube");
    TexYoutube.setAttribute("formControlName","idvideoyoutube");
    TexYoutube.addEventListener("blur",this.ObterIdVideo);
    
    div.appendChild(TexYoutube)
    AreaDeConteudo?.appendChild(div);
  }

  ObterIdVideo(e:any){
    e.target.value = String(e.target.value).replace("https://www.youtube.com/watch?v=",'');
  }

  MapearInputImagemVazioFormGroup(){
    this.conteudoDatalhesForm.push(
      this.fb.group({
      imagem:[]
      })
    );
  }
  MapearTextAreaTextoVazioFormGroup(){
    this.conteudoDatalhesForm.push(
      this.fb.group({
        texto: ['']
      })
    );
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
    this.ConteudoHeaderEncontrado! == undefined ? this.conteudoHeader.conteudoPai = '' : this.conteudoHeader.conteudoPai = this.ConteudoHeaderEncontrado!.codigo;
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

  SalvarConteudo(FormConteudo: any){ 
       this.conteudoHeader = this.TransferirFormConteudoParaObjeto();
       this.louder.OpenLoader();
       this.conteudoService.saveConteudo(this.conteudoHeader).subscribe(      
        {
          next:() => {
          },
          error: err => {
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

    Upload(event:any){
      this.conteudoService.uploadImagem(event);    
    }
}