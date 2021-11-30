export interface Mensagem{
  CriarMensagemSucesso():string;
  CriarMensagemAviso():string;
  CriarMensagemErro():string;
}
export class NiveisMensagem{
  protected ConstNivelSucesso:string = "Sucesso";
  protected ConstNivelAviso:string = "Aviso";
  protected ConstNivelErro: string = "Erro";
}
export class MensagensInsert extends NiveisMensagem implements Mensagem{
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
export class MensagemBoxService{

      CloseMessageBox(){
        var msg = document.getElementById("messagebox")
        msg?.classList.remove("message-box");
        msg?.classList.add("message-box-end");
      }
  
      OpenMessageBox(){
        var msg = document.getElementById("messagebox");
        msg?.classList.remove("message-box-end");
        msg?.classList.add("message-box");
      }
}