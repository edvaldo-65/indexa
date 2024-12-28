import { Injectable } from '@angular/core';
import { Contato } from '../interfaces/iContato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private readonly API = 'http://localhost:3000/contatos';

  constructor(private http: HttpClient) {

  }

  obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.API);
  }

  salvarContatos(contato: Contato) {
    return this.http.post<Contato>(this.API, contato)
  }
}