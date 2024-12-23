import { Injectable } from '@angular/core';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private contatos: Contato[] = [
    
    {"id": 1, "nome": "Antônio", "telefone": "38 128451235"},
    {"id": 2, "nome": "Ágata", "telefone": "38 128451235"},
    {"id": 3, "nome": "Bruno", "telefone": "95 695521583"},
    {"id": 4, "nome": "Beatriz", "telefone": "25 854986459"},
    {"id": 5, "nome": "Carlos", "telefone": "94 543197849"},
    {"id": 6, "nome": "Cláudia", "telefone": "31 176437098"},
    {"id": 7, "nome": "Daniel", "telefone": "56 613692441"},
    {"id": 8, "nome": "Eliana", "telefone": "94 601212586"},
  ]
  constructor() { 
    //Tentar obter os dados do localStorage
    const contatosLocalStorageString: string | null = localStorage.getItem('contatos');
    const contatosLocalStorage: Contato[] = 
      contatosLocalStorageString ? JSON.parse(contatosLocalStorageString) : this.contatos;

    if (contatosLocalStorage !== null) {
      this.contatos = contatosLocalStorage;
      //Salvar os contatos no localStorage
      localStorage.setItem('contatos', JSON.stringify(this.contatos));
    }
  }
    obterContatos(): Contato[] {
      return this.contatos;
    }
}
