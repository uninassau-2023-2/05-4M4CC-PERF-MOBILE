import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonStateService {
  private userPokemon: any = {
    abilities: [] // Inicialmente vazio
  };

  constructor() {}

  setUserPokemon(pokemon: any) {
    this.userPokemon = pokemon; // Configuração do Pokémon da Tab 1 no serviço
  }

  getPokemonAbilities(): number {
    return this.userPokemon.abilities.length; // Retorna o número de habilidades do Pokémon
  }
}
