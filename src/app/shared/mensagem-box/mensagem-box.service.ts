export interface Mensagem{
  CriarMensagem():string;
}
export class NiveisMensagem{
  protected ConstSucesso:string = "Sucesso";
  protected ConstAviso:string = "Aviso";
  protected ConstErro: string = "Erro";
}

export class MensagensCRUD extends NiveisMensagem{
  protected ConstFraseSucesso: string = "o registro foi salvo!";
  protected ConstFraseAviso: string = "registro pode não ter sido salvo corretamente";
  protected ConstFraseErro: string = "não foi possivel inserir o registro";
}

export class MensagemSucesso extends MensagensCRUD implements Mensagem{
  CriarMensagem(){
    return this.ConstSucesso.concat(" - ", this.ConstFraseSucesso);
  }
}
export class MensagemAviso extends MensagensCRUD implements Mensagem{
  CriarMensagem(){
    return this.ConstAviso.concat(" - ", this.ConstFraseAviso);
  }
}
export class MensagemErro extends MensagensCRUD implements Mensagem{
  CriarMensagem(){
    return this.ConstErro.concat(" - ", this.ConstFraseErro);
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