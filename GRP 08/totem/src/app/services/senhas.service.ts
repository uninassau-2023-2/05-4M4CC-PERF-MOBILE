import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  constructor() { }
  somaGeral() { this.senhasGeral++; this.senhasTotal++; }
  somaPrior() { this.senhasPrior++; this.senhasTotal++; }
  somaExame() { this.senhasExame++; this.senhasTotal++; }

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public inputNovaSenha: string = '';
  public senhasArray: Array<string> = []
  public senhasChamada: Array<string> =[]
  public ultimosCinco = this.senhasArray.slice(-5);


  novaSenha(tipoSenha: string = '') {
    if (tipoSenha == 'SG') {
      this.somaGeral();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray.length + 1).toString().padStart(2, '0');
      this.senhasArray.push(this.inputNovaSenha);

    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray.length + 1).toString().padStart(2, '0');
      this.senhasArray.push(this.inputNovaSenha);

    } else if (tipoSenha == 'SE') {
      this.somaExame();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray.length + 1).toString().padStart(2, '0');
      this.senhasArray.push(this.inputNovaSenha);
    }
    this.ultimosCinco = this.senhasArray.slice(-5);
    console.log("Senhas",this.senhasArray);
  }

  chamarSenhas() {
    let chamouSP = false;
  
    while (this.senhasArray.length > 0) {
      let senhaChamada = '';
  
      if (!chamouSP && this.senhasPrior > 0) {
        const senhaPriorIndex = this.senhasArray.findIndex(senha => senha.includes('SP'));
        if (senhaPriorIndex !== -1) {
          senhaChamada = this.senhasArray.splice(senhaPriorIndex, 1)[0];
          this.senhasPrior--;
          chamouSP = true;
        }
      } else {
        const senhaExameIndex = this.senhasArray.findIndex(senha => senha.includes('SE'));
        const senhaGeralIndex = this.senhasArray.findIndex(senha => senha.includes('SG'));
  
        if (senhaExameIndex !== -1) {
          senhaChamada = this.senhasArray.splice(senhaExameIndex, 1)[0];
          this.senhasExame--;
        } else if (senhaGeralIndex !== -1) {
          senhaChamada = this.senhasArray.splice(senhaGeralIndex, 1)[0];
          this.senhasGeral--;
        }
        chamouSP = false;
      }
  
      if (senhaChamada) {
        this.senhasChamada.push(senhaChamada);
      } else {
        break;  // Nenhuma senha para chamar, saia do loop
      }
    }
  } 
}

