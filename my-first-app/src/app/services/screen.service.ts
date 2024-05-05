import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private http: HttpClient) { }
  token = sessionStorage.getItem('token').replace(/"/g, '');

  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  getAllScreens(){ 
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/screen/api/getAllScreen`, {headers: this.headers});
  }
}
