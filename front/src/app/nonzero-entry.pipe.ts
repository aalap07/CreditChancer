import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './card';
import { CardService } from './card.service';

@Pipe({
  name: 'nonzeroEntry'
})
export class NonzeroEntryPipe implements PipeTransform {

  constructor(private cardService: CardService){
  }

  transform(arg1): unknown {
    var count = 0;
    var cardName = arg1;
    this.cardService.getCards().subscribe((cards) => {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].name == cardName) {
          count++;
        }
      }
      
    });
    return count != 0 ? cardName : null;
  }

}
