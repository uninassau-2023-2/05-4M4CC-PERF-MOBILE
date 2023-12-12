import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface pokeResponse {
  height: number
  id: number
  name: string
  sprites: Sprites
  weight: number
  abilities: [any]
}
interface Sprites {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}
@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private httpClient: HttpClient) { }

  getPokemon(id: number = Math.floor(Math.random() * 100)): Observable<pokeResponse> {
    return this.httpClient.get<pokeResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }
}
