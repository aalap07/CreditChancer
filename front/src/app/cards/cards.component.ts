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
  apisearch: string;
  approvedPage: number;
  addCardPage: number;
  pageSize: number;

  constructor(private cardService: CardService) {
    this.approvedPage = 1;
    this.addCardPage = 1;
    this.pageSize = 10;
  }

  ngOnInit() {
    this.cardService.getCards().subscribe((cards) => (this.cards = cards));
  }

  addCard(cardName) {
    const newCard = {
      name: cardName,
      creditScore: this.creditScore,
      acctAgeYrs: this.acctAgeYrs,
      acctAgeMos: this.acctAgeMos,
    };
    this.cardService
      .postCard(newCard)
      .subscribe((card) => {
        this.cards.push(newCard)
      });
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

  numApprovedPages() {
    return Math.ceil(this.cards.length / this.pageSize);
  }

  numAddCardPages() {
    return Math.ceil(this.apiCards.length / this.pageSize);
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
