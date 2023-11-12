import { Component } from '@angular/core';
import { PokeAPIService } from './../services/poke-api.service';
import { ViaCEPService } from './../services/via-cep.service';
import { PokemonStateService } from './../services/pokemon-state.service'; // Importando o serviço

@Component({
  selector: 'app-page',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };

  pokemon: any = {
    name: '',
    front_default: '',
    abilities: [],
    height: '',
    weight: ''
  };

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private pokemonStateService: PokemonStateService // Adicionando o serviço
  ) {}

  buscarPokemon() {
    this.viaCEPService.getViaCEP(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = ' - ' + JSON.parse(JSON.stringify(value))['uf'];
    });

    this.pokeAPIService.getPokeAPIService().subscribe((value) => {
      this.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
      this.pokemon.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
      this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'];
      this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
      this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];

      // Adicionando os dados do Pokémon ao serviço PokemonStateService
      this.pokemonStateService.setUserPokemon(this.pokemon);
    });
  }
}
