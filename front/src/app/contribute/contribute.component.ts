import { Component, OnInit } from '@angular/core';
import { CardService } from "../card.service";
import { CardsComponent } from "../cards/cards.component";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['../cards/cards.component.css'],
  providers: [CardService]
})
export class ContributeComponent implements OnInit {
  apiCards: String[];
  apiCard: string;
  apisearch: string;
  addCardPage: number;
  pageSize: number;

  constructor(private cardService: CardService, private cardsComp: CardsComponent) {
    this.addCardPage = 1;
    this.pageSize = 10;
  }

  ngOnInit(): void {
    this.apiCards = new Array();
  }

  fetchApiCards() {
    this.cardService.getApiCards(this.apisearch).subscribe((apiCards) => {
      var filtered = new Array();
      for (var i = 0; i < apiCards.results.length; i++) {
        filtered.push(apiCards.results[i].title);
      }
      this.apiCards = filtered;
    });
    return this.apiCards;
  }

  numAddCardPages() {
    var pages = Math.ceil(this.apiCards.length / this.pageSize);
    return pages == 0 ? 1 : pages;
  }

  addCard(cardName, creditScore, acctAgeYrs, acctAgeMos) {
    return this.cardsComp.addCard(cardName, creditScore, acctAgeYrs, acctAgeMos);
  }
}
