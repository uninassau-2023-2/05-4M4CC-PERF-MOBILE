import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonStateService {
  private userPokemon: any = {
    abilities: [] 
  };

  constructor() {}

  setUserPokemon(pokemon: any) {
    this.userPokemon = pokemon; 
  }

  getPokemonAbilities(): number {
    return this.userPokemon.abilities.length; 
  }
}