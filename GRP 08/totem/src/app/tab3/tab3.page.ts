import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private intervalId: any;

  constructor(public senhasService: SenhasService) { }

  ionViewDidEnter() {
    // Verificar se há senhas no senhasArray antes de iniciar o agendamento
    if (this.senhasService.senhasArray.length > 0) {
      this.iniciarAgendamento();
    }
  }

  iniciarAgendamento() {
    this.intervalId = setInterval(() => {
      this.senhasService.chamarSenhas();
      console.log("?SenhasAten " + this.senhasService.senhasChamada);
      console.log("!Senhas Array " + this.senhasService.senhasArray);
    }, 2000);
  }

  ionViewWillLeave() {
    console.log("Saindo da Tab3Page. Limpando o intervalo.");
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}