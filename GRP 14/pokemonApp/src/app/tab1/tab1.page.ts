import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };
  pokemon1: any = {
    name: '',
    abilities: 0,
    height: 0,
    weigth: 0,
    id: 0,
  };
  constructor(
    private pokeApiService: PokeAPIService,
    private viaCEPService: ViaCEPService
  ) {}
  ngOnInit() {
    this.getPokemon(1);
  }

  buscarPokemon() {
    this.viaCEPService
      .getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))[
          'logradouro'
        ];
        this.areaBusca.bairro =
          ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade =
          ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
      });
    this.getPokemon();
  }

  getPokemon(id?: number) {
    this.pokeApiService.getPokeAPIService(id).subscribe((fetchedPokemon) => {
      const pokemonObject = JSON.parse(JSON.stringify(fetchedPokemon));
      this.pokemon1.name = pokemonObject.name;
      this.pokemon1.abilities = pokemonObject.abilities.length;
      this.pokemon1.height = pokemonObject.height;
      this.pokemon1.weight = pokemonObject.weight;
      this.pokemon1.id = pokemonObject.id;
      localStorage.setItem('pokemon1', pokemonObject.abilities.length || 0);
    });
  }
}
