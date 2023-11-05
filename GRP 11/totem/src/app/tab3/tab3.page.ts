import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  progress = 0;
  constructor(public senhasService: SenhasService) {
    console.log(this.getRandomInt(5))
    setInterval(() => {
      this.progress+=0.01
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, this.getRandomInt(5)*100);
      }
    }, 1000);
  }


  // Função para tentativa de fazer a regra de negócio de TempoMédio
  callVariableTM(val: string){
    if(val[8]=="G"){
      let geralProgress = 0
      return setInterval(() => {
        geralProgress+=0.01
  
        // Reset the progress bar when it reaches 100%
        // to continuously show the demo
        if (geralProgress > 1) {
          setTimeout(() => {
            geralProgress = 0;
          }, this.getRandomInt(3)*100);
        }
      }, 1000);
    } else if(val[8]=="P"){
      let priorProgress = 0
      return setInterval(() => {
        priorProgress+=0.01
  
        // Reset the progress bar when it reaches 100%
        // to continuously show the demo
        if (priorProgress > 1) {
          setTimeout(() => {
            priorProgress = 0;
          }, this.getRandomInt(5)*100);
        }
      }, 1000);
    } else if(val[8]=="E"){
      let examProgress = 0
      return setInterval(() => {
        examProgress+=0.01
  
        // Reset the progress bar when it reaches 100%
        // to continuously show the demo
        if (examProgress > 1) {
          setTimeout(() => {
            examProgress = 0;
          }, this.getRandomInt(5)*100);
        }
      }, 1000);
    } else {
      return this.getRandomInt(2)*100
    }
  }
}