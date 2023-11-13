import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoSevice: PhotoService,
     private pokeAPIService: PokeAPIService) {}

    public pokemon: any = {
      nome: '',
      habilidades: '',
      altura: '',
      peso: ''
  
    }
  
    public img: string = ''

    ionViewWillEnter() {
      this.buscarPokemon();
    }

    buscarPokemon() {
      this.pokeAPIService.getPokeAPIService().subscribe((data: any) => {
        this.pokemon.nome = data.name
        let index: number = 0
        let todasHabilidades: any[] = data.abilities
        for(let i: number = 0; i < todasHabilidades.length; i++) {
          index =  index + 1
        }
        this.pokemon.habilidades = index
        this.pokemon.altura = data.height
        this.pokemon.peso = data.weight
        this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
      })
    }
  
    addPhotoToGallery() {
      this.photoSevice.addNewToGallery();
    }
}
