import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface getViaCepResponse {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
}

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private httpClient: HttpClient) {}

  getViaCep(cep: string): Observable<getViaCepResponse> {
    return this.httpClient.get<getViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
