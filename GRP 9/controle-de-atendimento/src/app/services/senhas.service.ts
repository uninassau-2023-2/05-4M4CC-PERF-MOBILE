import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SenhasService {
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  
  public inputNovaSenha: string = ''
  public senhasArray: { [key: string]: string[] } = {
    ['SP']: [],
    ['SE']: [],
    ['SG']: [],
  }
  public senhasarra: string[] = [];

  public senhasChamadas: {  
    tipoSenha: string;
    guiche: string;
    senha: string | undefined;
    data: string;
  }[] = [];
  
  constructor() { }

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
  
  novaSenha(tipoSenha: string) {
    if (tipoSenha == 'SG') {
      this.somaGeral();
      if (!this.senhasArray['SG']) {
        this.senhasArray['SG'] = [];
      }
      this.inputNovaSenha = 
      this.pegarData() +
        '-' +
        tipoSenha +
        (this.senhasGeral + 1).toString().padStart(2, '0');
      this.senhasArray['SG'].push(this.inputNovaSenha);
    } 
    else if (tipoSenha == 'SP') {
      this.somaPrior()
      if (!this.senhasArray['SP']) {
        this.senhasArray['SP'] = [];
      }
      this.inputNovaSenha = 
      this.pegarData() +
        '-' +
        tipoSenha +
        (this.senhasPrior + 1).toString().padStart(2, '0');
      this.senhasArray['SP'].push(this.inputNovaSenha);
    }
    else if (tipoSenha == 'SE') {
      this.somaExame()
      if (!this.senhasArray['SE']) {
        this.senhasArray['SE'] = [];
      }
      this.inputNovaSenha = 
      this.pegarData() +
        '-' +
        tipoSenha +
        (this.senhasExame + 1).toString().padStart(2, '0');
      this.senhasArray['SE'].push(this.inputNovaSenha);
    }
    console.log(this.senhasArray)
  }

  pegarData(format?: boolean): string {
    if(format) {
      const stringDate =       
      new Date().getDay().toString().padStart(2, '0') +
      '/' +
      new Date().getMonth().toString().padStart(2, '0') +
      '/' +
      new Date().getFullYear().toString().substring(2,4)
      return stringDate
    }
    const stringDate =       
    new Date().getDate().toString().padStart(2, '0') +
    (new Date().getMonth() + 1).toString().padStart(2, '0') +
    new Date().getFullYear().toString().substring(2,4)
    return stringDate
  }

  private chamarSenhaSP(guiche: string) {
    let proxSenhaSP = this.senhasArray['SP'].shift()
        this.senhasChamadas.unshift({
        tipoSenha: 'SP',
        guiche: guiche,
        senha: proxSenhaSP,
        data: this.pegarData(true)
      })
  }

  private  chamarSenhaSE(guiche: string) {
    let proxSenhaSE = this.senhasArray['SE'].shift()
    this.senhasChamadas.unshift({
      tipoSenha: 'SE',
      guiche: guiche,
      senha: proxSenhaSE,
      data: this.pegarData(true)
    })
  }

  private  chamarSenhaSG(guiche: string) {
    let proxSenhaSG = this.senhasArray['SG'].shift()
        this.senhasChamadas.unshift({
          tipoSenha: 'SG',
          guiche: guiche,
          senha: proxSenhaSG,
          data: this.pegarData(true)
        })
  }

  chamarSenha(guiche: string) {
    if(this.senhasChamadas && this.senhasChamadas.length > 0) {
      if(this.senhasChamadas[0].tipoSenha === 'SP') {
        if (this.senhasArray['SE'] && this.senhasArray['SE'].length > 0) {
          this.chamarSenhaSE(guiche);
          console.log(this.senhasChamadas)
          return
        }
        else if (this.senhasArray['SG'] && this.senhasArray['SG'].length > 0) {
          this.chamarSenhaSG(guiche);
          console.log(this.senhasChamadas)
          return
        }
        else {
          console.log('Não há mais senhas para chamar');
          return
        }
      }
    }
    if (this.senhasArray['SP'] && this.senhasArray['SP'].length > 0) {
      this.chamarSenhaSP(guiche);
      console.log(this.senhasChamadas)
      return
    }
    else if (this.senhasArray['SE'] && this.senhasArray['SE'].length > 0) {
      this.chamarSenhaSE(guiche);
      console.log(this.senhasChamadas)
      return
    }
    else if (this.senhasArray['SG'] && this.senhasArray['SG'].length > 0) {
      this.chamarSenhaSG(guiche);
      console.log(this.senhasChamadas)
      return
    }
    else {
      console.log('Não há mais senhas para chamar');
      return
    }
  }
  
}
