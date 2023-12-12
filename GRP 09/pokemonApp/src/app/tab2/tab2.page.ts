import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeApiService } from '../services/poke-api.service';
import { pokemon, store } from '../store/store';

interface IPokeInfo {
  name: string
  id: number
  image: string
  weight: number
  height: number
  abilities: number
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokeInfo: IPokeInfo = {
    name: '???????',
    id: 0,
    image: '',
    weight: 0,
    height: 0,
    abilities: 0
  }

  batleResult?: string

  constructor(private photoService: PhotoService, private pokeService: PokeApiService) {
    this.buscarPokemon()
  }

  addPhotoToGallery() {
    this.photoService.addBewToGallery();
  }

  buscarPokemon() {
    this.pokeService.getPokemon().subscribe(
    res => {
      let resPokemon = {
        name: res.name.toUpperCase(),
        id: res.id,
        image: res.sprites.front_default,
        weight: res.weight,
        height: res.height,
        abilities: res.abilities.length,
      }
      this.pokeInfo = resPokemon
      this.batalhar(resPokemon)
    },
    err => {
      console.log(err)
    })
  }

  batalhar(newPokemon: IPokeInfo) {
    if(store.pokemons.length > 0) {
      let pokemonBatalha: pokemon = store.pokemons[(store.pokemons.length - 1) ]
      if(pokemonBatalha.abilities > newPokemon.abilities) {
        this.batleResult = "PERDEU"
        store.pokemons[(store.pokemons.length - 1)].vitorias += 1 
      }
      if(pokemonBatalha.abilities < newPokemon.abilities) {
        this.batleResult = "GANHOU"
        store.pokemons[(store.pokemons.length - 1)].derrotas += 1 
      }
      if(pokemonBatalha.abilities == newPokemon.abilities) {
        this.batleResult = "EMPATOU"
        store.pokemons[(store.pokemons.length - 1)].empates += 1 
      }
    }
  }
}
