import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Card } from './card'
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: Http) { }

  getCards() {
    return this.http.get('http://localhost:3000/')
      .map(res => res.json());
  }

  postCard(newCard) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/new', newCard, { headers: headers })
      .map(res => res.json());
  }

  getApiCards(){
    return this.http.get(`https://api.ccstack.io/v1/search/cards?api_key=CCSTACK_API_KEY`)
      .map(res=>res.json());
  }

}