import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SenhasService {
  public inputNovaSenha: string = ''
  public senhasArray: Array<string> = []
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;

  constructor() { }

  somaGeral(){this.senhasGeral++; this.senhasTotal++;}
  somaPrior(){this.senhasPrior++; this.senhasTotal++;}
  somaExame(){this.senhasExame++; this.senhasTotal++;}


  novaSenha(tipoSenha: string=''){
    if(tipoSenha=='SG'){
      this.somaGeral();
      this.inputNovaSenha = 
        new Date().getFullYear().toString().substring(2,4) + 
        new Date().getMonth().toString().padStart(2,'0') + 
        new Date().getDay().toString().padStart(2,'0') +
        '-'+
        tipoSenha + 
        (this.senhasArray.length + 1).toString().padStart(2,'0');
      this.senhasArray.push(this.inputNovaSenha); 
    } else if(tipoSenha=='SP') {
      this.somaPrior();
      this.inputNovaSenha = 
      new Date().getFullYear().toString().substring(2,4) + 
      new Date().getMonth().toString().padStart(2,'0') + 
      new Date().getDay().toString().padStart(2,'0') +
      '-'+
      tipoSenha + 
      (this.senhasArray.length + 1).toString().padStart(2,'0');
    this.senhasArray.push(this.inputNovaSenha); 
    } else if(tipoSenha=='SE') {
      this.somaExame();
      this.inputNovaSenha = 
      new Date().getFullYear().toString().substring(2,4) + 
      new Date().getMonth().toString().padStart(2,'0') + 
      new Date().getDay().toString().padStart(2,'0') +
      '-'+
      tipoSenha + 
      (this.senhasArray.length + 1).toString().padStart(2,'0');
    this.senhasArray.push(this.inputNovaSenha); 
    }

    console.log(this.senhasArray)
  }
}
