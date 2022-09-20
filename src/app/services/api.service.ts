import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getHello(): Observable<any> {
    return this.http.get(environment.apiHost + '/hello');
  }

  public getDataHora(): Observable<any> {
    return this.http.get(environment.apiHost + '/');
  }

  public getTexto(formData): Observable<FormData> {
    return this.http.post<FormData>(environment.apiHost + '/texto/', formData)
  }

}
