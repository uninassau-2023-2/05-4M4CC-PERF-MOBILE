import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { ViaCepService } from '../services/via-cep.service';
import { PokemonStateService } from '../services/pokemon-state.service';

interface Pokemon {
    name: string;
    abilities: Ability[];
    height: number;
    weight: number;
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            };
        };
    };
}

interface Ability {
    name: string;
}

@Component({
    selector: 'app-tab1',
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
    }

    pokemonModel: Pokemon = {
        name: '',
        abilities: [],
        height: 0,
        weight: 0,
        sprites: {
            other: {
                dream_world: {
                    front_default: ''
                }
            }
        },
    };

    constructor(
        private pokeApiService: PokeApiService,
        private viaCepService: ViaCepService,
        private pokemonStateService: PokemonStateService
    ) { }

    buscarPokemon() {
        this.viaCepService.getViaCEPService(this.areaBuscarPokemon)
            .subscribe((value) => {
                this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
                this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
                this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
                this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
            });
        this.pokeApiService.getPokeApiService().subscribe((pokemon: any) => {
            this.pokemonModel = pokemon;
            this.pokemonStateService.setUserPokemon(pokemon);
        });
    }
}
