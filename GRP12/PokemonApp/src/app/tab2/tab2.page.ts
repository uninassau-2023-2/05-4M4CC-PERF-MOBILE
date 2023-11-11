import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { PhotoService } from '../services/Photo/photo.service';
import { PokeAPIService } from '../services/PokeService/poke-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pokemon: any
  pokeAbilities: Number = 0
  pokemonInimigo: any = {
    nome: '',
    imagem: '',
    habilidades: '',
    altura: '',
    peso: '',
  }

  constructor(public photoService: PhotoService, public navController: NavController, private pokeAPI: PokeAPIService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery()
  }

  ionViewDidEnter() {
    this.pokeAPI.getPokeAPIService().subscribe((data) => {
      this.pokemon = data
      this.pokemonInimigo.nome = this.pokemon.name
      this.pokemonInimigo.imagem = this.pokemon.sprites.other.dream_world.front_default
      this.pokemonInimigo.habilidades = this.pokemon.abilities.length
      this.pokemonInimigo.altura = (Number(this.pokemon.height) / 10)
      this.pokemonInimigo.peso = (Number(this.pokemon.weight) / 10)
    })

    this.pokeAbilities = this.pokeAPI.getAbilities()
  }
}