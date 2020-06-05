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
  approvedPage: number;
  pageSize: number;

  constructor(private cardService: CardService) {
    this.approvedPage = 1;
    this.pageSize = 10;
  }

  ngOnInit() {
    this.cardService.getCards().subscribe((cards) => (this.cards = cards));
  }

  addCard(cardName, creditScore, acctAgeYrs, acctAgeMos) {
    const newCard = {
      name: cardName,
      creditScore: creditScore,
      acctAgeYrs: acctAgeYrs,
      acctAgeMos: acctAgeMos,
    };
    this.cardService
      .postCard(newCard)
      .subscribe((card) => {
        this.cards.push(newCard)
      });
  }

  numApprovedPages() {
    return Math.ceil(this.cards.length / this.pageSize);
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
