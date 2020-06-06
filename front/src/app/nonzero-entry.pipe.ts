import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './card';
import { CardService } from './card.service';

@Pipe({
  name: 'nonzeroEntry'
})
export class NonzeroEntryPipe implements PipeTransform {
  names: String[];

  constructor(private cardService: CardService){
    this.names = new Array();
  }

  transform(arg1): unknown {
    this.cardService.getCards().subscribe((cards) => {
      for (var i = 0; i < cards.length; i++){
        this.names.push(cards[i].name);
      }
    });
    return this.names.includes(arg1[0]) ? arg1[0] : null;
  }

}
