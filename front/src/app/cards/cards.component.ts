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
  cards: Card[];
  card: Card;
  name: string;
  creditScore: number;
  acctAgeYrs: number;
  acctAgeMos: number;

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.cardService.getCards().subscribe((cards) => (this.cards = cards));
  }
}
