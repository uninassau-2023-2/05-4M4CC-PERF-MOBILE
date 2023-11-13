import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokemonAdv: any = {
    id: '',
    nome: '',
    habilidades: '',
    peso: '',
    altura: '',
    img: ''
  }
  pokeAbilities: Number = 0

  result: any = {
    name: ''
  }
  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    public navCtrl: NavController
    ) { this.getPokemonAdv() }

  AddPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  getPokemonAdv(){
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemonAdv.nome = JSON.parse(JSON.stringify(value))['name']
        this.pokemonAdv.habilidades = JSON.parse(JSON.stringify(value))['abilities'].length
        this.pokemonAdv.peso = JSON.parse(JSON.stringify(value))['weight']
        this.pokemonAdv.altura = JSON.parse(JSON.stringify(value))['height']
        this.pokemonAdv.img = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default']
      })
      this.battleResult()
  }

  battleResult(){
    console.log(this.pokeAPIService.getAbilities(), this.pokemonAdv.habilidades)
    const pokemonAbilities = this.pokeAPIService.getAbilities();
    const PokemonAdvAbilities = this.pokemonAdv.habilidades

    if (pokemonAbilities < PokemonAdvAbilities) {
      this.result.name = 'Ganhou';
    } else if (pokemonAbilities === PokemonAdvAbilities) {
      this.result.name = 'Empate';
    } else {
      this.result.name = 'Perdeu';
    }
  }
}
