import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  sendRequest(endpoint: string, method: string, body: any = null) {    
    const apiUrl = environment.apiUrl; 
    const url = `${apiUrl}/${endpoint}`;
    return this.http.request(method, url, { body: body });
  }
}
