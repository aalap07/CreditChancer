import { Component, OnInit } from "@angular/core";
import { CardService } from "../card.service";
import { Card } from "../card";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"],
  providers: [CardService],
})

export class CardsComponent implements OnInit {
  term: string;
  cards: Card[];
  card: Card;
  name: string;
  creditScore: number;
  acctAgeYrs: number;
  acctAgeMos: number;
  apiCards: String[];
  apiCard: string;

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.cardService.getCards().subscribe((cards) => (this.cards = cards));
    this.cardService.getApiCards().subscribe(
      (apiCards) => {
        var filtered = new Array();
        for(var i = 0; i < apiCards.results.length; i++){
          //console.log(apiCards.results[i].original_title);
          filtered.push(apiCards.results[i].title);
        }
        this.apiCards = filtered;
      });
  }

  addCard() {
    const newCard = {
      name: this.name,
      creditScore: this.creditScore,
      acctAgeYrs: this.acctAgeYrs,
      acctAgeMos: this.acctAgeMos
    }
    this.cardService.postCard(newCard)
      .subscribe(card => {
        this.cards.push(card);
      });
  }
}
