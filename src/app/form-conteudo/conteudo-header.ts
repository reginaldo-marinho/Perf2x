
export class ConteudoHeader{

    constructor (){
    }
    codigo! :string;
    titulo! :string;
    posicao!:number;
    nivelConteudo!:number;
    timestamp!:string;
    conteudoPai!:string;
    conteudoDatalhes!: ConteudoDatalhes[];
}

export class ConteudoDatalhes{
    constructor (){
    }
    codigo! :string;
    texto! :string;
    imagem!:string;
    codigoHeader!:string;
    linha! :number;
}

export class DescricaoImagem{ 
  nome!:string;
  tamanho!:string;
  ultimaModificacao!:string;
}






