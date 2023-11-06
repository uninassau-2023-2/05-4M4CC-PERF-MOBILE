import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public inputNovaSenha: string = '';
  public senhasArray: { [keys: string]: string[] } = {
    SG: [],
    SP: [],
    SE: [],
  };

  constructor() {}

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }
  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }
  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  formatDate() {
    return (
      new Date().getFullYear().toString().substring(2, 4) +
      new Date().getMonth().toString().padStart(2, '0') +
      new Date().getDay().toString().padStart(2, '0')
    );
  }

  novaSenha(tipoSenha: string = '') {
    if (tipoSenha == 'SG') {
      this.somaGeral();
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
    } else if (tipoSenha == 'SE') {
      this.somaExame();
    }

    this.inputNovaSenha =
      this.formatDate() +
      '-' +
      tipoSenha +
      (this.senhasArray[tipoSenha].length + 1).toString().padStart(2, '0');

    this.senhasArray[tipoSenha].push(this.inputNovaSenha);

    console.log(this.senhasArray);
  }
}
