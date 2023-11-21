import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(private httpClient: HttpClient) { }

  pokeAbilities: Number = 0

  getPokeAPIService(id: number = Math.floor(Math.random() * 100)) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

  setAbilities(Abilities: Number) {
    this.pokeAbilities = Abilities
  }

  getAbilities(){
    return this.pokeAbilities
  }
}
