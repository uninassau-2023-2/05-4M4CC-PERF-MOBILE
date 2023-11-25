import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  pokemons: any = this.pokeAPIService.pokemonsCaptureds
  trackPokes(index: number, itemObject: any) {
    return itemObject.id;
  } 

  constructor(private pokeAPIService: PokeAPIService) {}

  ionViewDidEnter(){
    console.log(this.pokemons)
  }

}
