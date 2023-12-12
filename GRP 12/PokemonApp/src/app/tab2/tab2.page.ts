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
  resultado: string = ''
  pokemonI: any
  pokemonInimigo: any = {
    nome: '',
    imagem: '',
    habilidades: '',
    altura: '',
    peso: '',
  }

  dadosPokemon: any

  constructor(public photoService: PhotoService, public navController: NavController, private pokeAPI: PokeAPIService,) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery()
  }

  ionViewDidEnter() {
    this.pokeAPI.getPokeAPIService().subscribe((data) => {
      this.pokemonI = data
      this.pokemonInimigo.nome = this.pokemonI.name
      this.pokemonInimigo.imagem = this.pokemonI.sprites.other.dream_world.front_default
      this.pokemonInimigo.habilidades = this.pokemonI.abilities.length
      this.pokemonInimigo.altura = (Number(this.pokemonI.height) / 10)
      this.pokemonInimigo.peso = (Number(this.pokemonI.weight) / 10)


      if (this.pokeAPI.getPokemon1().habilidades > this.pokemonInimigo.habilidades) {
        this.pokeAPI.getPokemon1().vitorias++
        this.resultado = "perdeu"
      } else if (this.pokeAPI.getPokemon1().habilidades == this.pokemonInimigo.habilidades) {
        this.pokeAPI.getPokemon1().empates++
        this.resultado = "empate"
      } else if (this.pokeAPI.getPokemon1().habilidades < this.pokemonInimigo.habilidades) {
        this.pokeAPI.getPokemon1().derrotas++
        this.resultado = "ganhou"
      }
    })
  }
}