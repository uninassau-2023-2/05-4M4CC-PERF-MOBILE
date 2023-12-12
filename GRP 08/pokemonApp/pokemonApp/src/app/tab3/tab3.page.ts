import { Component } from '@angular/core';
import { PokemonStateService } from './../services/pokemon-state.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  battleStats: { won: number; lost: number; draw: number };
  userPokemon: any;

  constructor(private pokemonStateService: PokemonStateService) {
    this.battleStats = this.pokemonStateService.getBattleStats();
    this.userPokemon = this.pokemonStateService.getUserPokemon();
  }
}
