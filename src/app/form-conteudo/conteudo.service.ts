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
    saveConteudo(coteudo: ConteudoHeader ): Observable<ConteudoHeader>{
        return this.http.post<ConteudoHeader>(this.configUrl,coteudo);
    }
    UpdateConteudo(coteudo: ConteudoHeader ): Observable<ConteudoHeader>{
        return this.http.put<ConteudoHeader>(`${this.configUrl}/${coteudo.codigo}`,coteudo);
    }
    deleteConteudo(id: number|string ): Observable<any>{
        return this.http.delete<any>( `${this.configUrl}/${id}`);
    }
}


