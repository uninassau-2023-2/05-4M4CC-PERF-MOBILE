import { Component } from '@angular/core';
import { PokeAPIService } from '../services/PokeService/poke-api.service';
import { ViaCEPService } from '../services/CEPService/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  areaBuscarPokemon: string = ''
  pokemon: any

  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  }

  dadosPokemon: any = {
    nome: '',
    imagem: '',
    habilidades: '',
    altura: '',
    peso: '',
    vitorias: 0,
    empates: 0,
    derrotas: 0
  }

  pokemonAnterior: any = this.dadosPokemon

  constructor(
    private pokeService: PokeAPIService,
    private CEPService: ViaCEPService
  ) { }

  buscarPokemon() {
    this.CEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
    })

    this.pokeService.getPokeAPIService().subscribe(data => {
      this.pokemon = data
      this.dadosPokemon.nome = this.pokemon.name
      this.dadosPokemon.imagem = this.pokemon.sprites.other.dream_world.front_default
      this.dadosPokemon.habilidades = this.pokemon.abilities.length
      this.dadosPokemon.altura = (Number(this.pokemon.height) / 10)
      this.dadosPokemon.peso = (Number(this.pokemon.weight) / 10)
      this.dadosPokemon.vitorias = 0
      this.dadosPokemon.empates = 0
      this.dadosPokemon.derrotas = 0
    })

    this.pokeService.addPokemonToList(this.dadosPokemon)
    this.pokeService.setPokemon1(this.dadosPokemon)
  }
}
