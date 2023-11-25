import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { PokeAPIService } from '../services/PokeService/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  dadosPokemon: any;
  pokemonList: any;

  constructor(public pokeApi: PokeAPIService, public navController: NavController) { }

  ionViewDidEnter() {
    this.pokemonList = this.pokeApi.getPokemonList();
    console.log(this.pokemonList);
  }
}
