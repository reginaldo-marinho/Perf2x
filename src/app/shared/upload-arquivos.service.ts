import { Injectable } from "@angular/core";
import { HttpClient,HttpRequest, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UploadArquivosService{
    constructor (private http: HttpClient){}

    private configUrl:string ='https://localhost:44331/api/ApiConteudo/upload'

    UploadUmagem(file: File ): Observable<HttpEvent<any>>{

        const formData:FormData = new FormData();

        formData.append('file',file);

        const req = new HttpRequest('POST', this.configUrl, formData, {
            reportProgress: true,
            responseType: 'json'
          });
          return this.http.request(req);
    }
}


