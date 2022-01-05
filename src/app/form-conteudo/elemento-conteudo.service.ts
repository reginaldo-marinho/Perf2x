import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class ElementoConteudoService{
    
    CriarElementoDetalheTipoTextArea(){
        let AreaDeConteudo = document.getElementById("area-de-conteudo")
        let div = this.CriarDivInputDetalhes();
        div.appendChild(CriarTextArea());
        AreaDeConteudo?.appendChild(div);
       
        function CriarTextArea():Node {
          let TextArea = document.createElement("textarea");
          TextArea.setAttribute("class","form-control");
          TextArea.setAttribute("id","textarea-conteudo")
          TextArea.setAttribute("name","texto");
          TextArea.setAttribute("formControlName","texto");
          TextArea.setAttribute("style","height: 200px;");
          return TextArea;
        }
      }
      CriarDivInputDetalhes() :Node{
        let  DivInputDetalhes = document.createElement("div");
        DivInputDetalhes.setAttribute("class","mb-3 me-1 ms-1");
        return DivInputDetalhes;
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
      CriarDivInputImagem() :Node{
        let  DivInputDetalhes = document.createElement("div");
        DivInputDetalhes.setAttribute("class","mb-3 me-1 ms-1");
        DivInputDetalhes.setAttribute("id",String(document.getElementsByTagName("img").length+1))
        return DivInputDetalhes;
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



}


