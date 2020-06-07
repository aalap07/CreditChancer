import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './card';
import { CardService } from './card.service';

@Pipe({
  name: 'nonzeroEntry'
})
export class NonzeroEntryPipe implements PipeTransform {
  filtered: String[];

  constructor(private cardService: CardService) {
  }

  transform(apiArray): unknown {
    this.filtered = new Array();

    this.cardService.getCards().subscribe((cards) => {
      for (var i = 0; i < apiArray.length; i++) {
        if (apiArray.includes(cards[i].name) && !this.filtered.includes(cards[i].name)) {
          this.filtered.push(cards[i].name);
        }
      }
    });
    return this.filtered;
  }

}
