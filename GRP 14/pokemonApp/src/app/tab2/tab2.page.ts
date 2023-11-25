import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  pokemon2: any = {
    name: '',
    abilities: 0,
    height: 0,
    weigth: 0,
    id: 0,
  };

  resultado = '';

  constructor(
    public photoService: PhotoService,
    private pokeApiService: PokeAPIService
  ) {}

  ionViewWillEnter() {
    this.generatePokemon();
  }

  generatePokemon() {
    this.pokeApiService.getPokeAPIService().subscribe((fetchedPokemon) => {
      const pokemonObject = JSON.parse(JSON.stringify(fetchedPokemon));
      this.pokemon2.name = pokemonObject.name;
      this.pokemon2.abilities = pokemonObject.abilities.length;
      this.pokemon2.height = pokemonObject.height;
      this.pokemon2.weight = pokemonObject.weight;
      this.pokemon2.id = pokemonObject.id;

      if (
        pokemonObject.abilities.length >
        Number(localStorage.getItem('pokemon1'))
      ) {
        this.resultado = 'GANHOU';
      } else if (
        pokemonObject.abilities.length ===
        Number(localStorage.getItem('pokemon1'))
      ) {
        this.resultado = 'EMPATOU';
      } else {
        this.resultado = 'PERDEU';
      }
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
