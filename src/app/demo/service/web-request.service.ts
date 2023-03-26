import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  constructor(
    private http: HttpClient
  ) {
    //this.ROOT_URL = "http://localhost:3000";
    this.ROOT_URL = "https://be-pegawai.vercel.app";
   }

   public get(url:string): Observable<any> {
    return this.http.get<any>(`${this.ROOT_URL}/${url}`);
   }

   public post(url: string, payload: Object): Observable<any> {
    return this.http.post<any>(`${this.ROOT_URL}/${url}`, payload);
   }

   public patch(url: string, payload: Object): Observable<any> {
    return this.http.patch<any>(`${this.ROOT_URL}/${url}`, payload);
   }

   public delete(url:string): Observable<any> {
    return this.http.delete<any>(`${this.ROOT_URL}/${url}`);
   }

   public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.ROOT_URL}/users/login`,{
      email,
      password
    }, { 
      observe: 'response'
     })
  }

  public signup(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.ROOT_URL}/users`,{
      email,
      password
    }, { 
      observe: 'response'
     })
  }
}
