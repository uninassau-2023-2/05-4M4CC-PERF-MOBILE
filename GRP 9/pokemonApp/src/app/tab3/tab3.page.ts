import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeApiService } from '../services/poke-api.service';
import { pokemon, store } from '../store/store';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pokemons: pokemon[] = []

  constructor(private pokeService: PokeApiService) {
    this.pokemons = store.pokemons
  }
}
