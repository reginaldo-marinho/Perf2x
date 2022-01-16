import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConteudoHeader } from "./conteudo-header";



@Injectable({
    providedIn: 'root'
})
export class ConteudoService{
    constructor (private http: HttpClient){}
    configUrl:string ='https://localhost:44331/api/ApiConteudo'
    NivelTituloConteudo = [
        {nivel:"Nivel H1",valor:1},
        {nivel:"Nivel H2",valor:2},
        {nivel:"Nivel H3",valor:3},
        {nivel:"Nivel H4",valor:4},
        {nivel:"Nivel H5",valor:5},
        {nivel:"Nivel H6",valor:6}]

    getAllConteudo():Observable<ConteudoHeader[]> {
        return this.http.get<ConteudoHeader[]>(this.configUrl);
    }
    
    getConteudoById(id : number|string):Observable<ConteudoHeader> {
        return this.http.get<ConteudoHeader>(`${this.configUrl}/${id}` );
    }
    getConteudoByText(texto :string):Observable<ConteudoHeader[]> {
        return this.http.get<ConteudoHeader[]>(`${this.configUrl}/buscar/${texto}` );
    }
    getConteudoHeader():Observable<ConteudoHeader[]> {
        return this.http.get<ConteudoHeader[]>(`${this.configUrl}/conteudoHeader/`);
    }
    getTimestamp():Observable<string> {
        return this.http.get<string>(`${this.configUrl}/timestamp` );
    }
    saveConteudo(coteudo: ConteudoHeader ): Observable<ConteudoHeader>{
        return this.http.post<ConteudoHeader>(this.configUrl,coteudo);
    }
    UpdateConteudo(coteudo: ConteudoHeader ): Observable<ConteudoHeader>{
        return this.http.put<ConteudoHeader>(`${this.configUrl}/${coteudo.codigo}`,coteudo);
    }
    deleteConteudo(id: number|string ): Observable<any>{
        return this.http.delete<any>( `${this.configUrl}/${id}`);
    }
    uploadImagem(form:FormData):void{
        this.http.post<FormData>(`${this.configUrl}/upload/`,form).subscribe();
    }
}


