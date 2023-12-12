// pokedex.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private capturedPokemons: any[] = [];
  private battleHistory: any[] = [];
  private lastBattleResult: any;

  capturePokemon(pokemon: any, victories: number, defeats: number, draws: number) {
    this.capturedPokemons.push({ name: pokemon.name, front_default: pokemon.front_default, victories, defeats, draws });
  }

  getLastBattleResult() {
    return this.lastBattleResult;
  }

  setLastBattleResult(battleResult: any) {
    this.lastBattleResult = battleResult;
    this.battleHistory.push(battleResult);
  }

  getCapturedPokemons() {
    return this.capturedPokemons;
  }

  getBattleHistory() {
    return this.battleHistory;
  }

  getPokemonBattles(pokemon: any): any {
    return this.battleHistory.find((battle) => battle.pokemon && battle.pokemon.name === pokemon.name);
  }

  getPokemonBattleHistory(pokemon: any): any[] {
    if (pokemon && pokemon.name) {
      return this.battleHistory.filter((battle) => battle.pokemon && battle.pokemon.name === pokemon.name);
    } else {
      return [];
    }
  }
}
