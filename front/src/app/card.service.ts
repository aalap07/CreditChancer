import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Card } from './card'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: Http) { }

  // Get
  getCards(){
    return this.http.get('http://localhost:3000/')
      .map(res => res.json());
  }

}
