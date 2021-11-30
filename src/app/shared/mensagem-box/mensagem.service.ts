import { Injectable } from "@angular/core";

export interface IMensagemNiveis{
  CriarMensagemSucesso():string;
  CriarMensagemAviso():string;
  CriarMensagemErro():string;
}
export class NiveisMensagem{
  protected ConstNivelSucesso:string = "Sucesso";
  protected ConstNivelAviso:string = "Aviso";
  protected ConstNivelErro: string = "Erro";
}

@Injectable({
  providedIn: 'root'
})
export class ServiceMensagensInsert extends NiveisMensagem implements IMensagemNiveis{
    protected ConstFraseSucesso: string = "o registro foi salvo!";
    protected ConstFraseAviso: string = "registro pode não ter sido salvo corretamente";
    protected ConstFraseErro: string = "não foi possivel inserir o registro";

    CriarMensagemSucesso():string{
        return this.ConstNivelSucesso.concat(" - ",this.ConstFraseSucesso);
    }
    CriarMensagemAviso():string{
      return this.ConstNivelSucesso.concat(" - ",this.ConstFraseSucesso);
    }
    CriarMensagemErro():string{
      return this.ConstNivelSucesso.concat(" - ",this.ConstFraseSucesso);
    }
}
