import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from "../card.service";

@Component({
  selector: 'app-chance-stepper',
  templateUrl: './chance-stepper.component.html',
  styleUrls: ['./chance-stepper.component.css']
})
export class ChanceStepperComponent implements OnInit {
  cardGroup: FormGroup;
  selectorGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isEditable = true;
  apiCards: String[];
  apiCard: string;
  chanceSearch: string;
  selectedCard: string;

  constructor(private _formBuilder: FormBuilder, private cardService: CardService) { }

  ngOnInit() {
    this.cardGroup = this._formBuilder.group({
      cardSearchCtrl: ['', Validators.required]
    });
    this.selectorGroup = this._formBuilder.group({
      selectedEntry: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  fetchApiCards() {
    this.cardService.getApiCards(this.chanceSearch).subscribe((apiCards) => {
      var filtered = new Array();
      for (var i = 0; i < apiCards.results.length; i++) {
        console.log(apiCards.results[i].title);
        filtered.push(apiCards.results[i].title);
      }
      this.apiCards = filtered;
    });
    return this.apiCards;
  }
}
