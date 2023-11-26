import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonStateService {
  private userPokemon: any = {
    abilities: [] // Inicialmente vazio
  };

  private battles: { won: number; lost: number; draw: number } = { won: 0, lost: 0, draw: 0 };

  setUserPokemon(pokemon: any) {
    this.userPokemon = pokemon;
  }

  getUserPokemon() {
    return this.userPokemon;
  }

  getPokemonAbilities(): number {
    return this.userPokemon.abilities.length;
  }

  updateBattleResult(result: 'won' | 'lost' | 'draw') {
    if (result === 'won') {
      this.battles.won++;
    } else if (result === 'lost') {
      this.battles.lost++;
    } else {
      this.battles.draw++;
    }
  }

  getBattleStats() {
    return this.battles;
  }
}
