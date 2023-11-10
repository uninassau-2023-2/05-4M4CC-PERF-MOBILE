import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

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
  }

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
    
    this.pokeService.getPokeAPIService().subscribe(data =>{
      this.pokemon = data
      this.dadosPokemon.nome = this.pokemon.name
      this.dadosPokemon.imagem = this.pokemon.sprites.other.dream_world.front_default
      this.dadosPokemon.habilidades = this.pokemon.abilities.length
      this.dadosPokemon.altura = (Number(this.pokemon.height)/ 10)
      this.dadosPokemon.peso = (Number(this.pokemon.weight) / 10)
    })

  }

}
