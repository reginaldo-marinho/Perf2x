import { Byte } from "@angular/compiler/src/util";

export class ConteudoHeader{

    constructor (){
    }
    codigo! :string;
    titulo! :string;
    posicao!:number;
    nivelConteudo!:number;
    conteudoPai!:string;
    conteudoDatalhes!: ConteudoDatalhes[];
}

export class ConteudoDatalhes{
    codigo! :string;
    texto! :string;
    imagem?:Byte;
    codigoHeader!:string;
    linha! :number;
}