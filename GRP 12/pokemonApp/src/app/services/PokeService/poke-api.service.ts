import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  public pokemonList: any[] = []

  pokemon1: any

  constructor(private httpClient: HttpClient) { }

  getPokeAPIService(id: number = Math.floor(Math.random() * 100)) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }


  setPokemon1(pokemon: any) {
    this.pokemon1 = pokemon
  }

  getPokemon1() {
    return this.pokemon1
  }

  addPokemonToList(pokemon: any) {
    const novoPokemon = { ...pokemon }; 
    this.pokemonList.push(novoPokemon);
  }

  getPokemonList() {
    return this.pokemonList
  }
}
