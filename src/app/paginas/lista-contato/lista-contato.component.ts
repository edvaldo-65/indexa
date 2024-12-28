import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ContainerComponent } from '../../componentes/container/container.component';
import { ContatoComponent } from '../../componentes/contato/contato.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { FormularioContatoComponent } from '../formulario-contato/formulario-contato.component';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../interfaces/iContato';

@Component({
  selector: 'app-lista-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormsModule,
    FormularioContatoComponent,
    RouterLink
  ],
  templateUrl: './lista-contato.component.html',
  styleUrl: './lista-contato.component.css'
})
export class ListaContatoComponent implements OnInit {
  alfabeto: string = "abcdefghijklmnopqrstuvxywz";
  contatos: Contato[] = [];

  filtroPorTexto: string = '';

  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    this.contatoService.obterContatos().subscribe(listaContatos => {
      this.contatos = listaContatos;
    });
  }

  // Remove os acentos de uma string
  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarContatosPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos
    }
    return this.contatos.filter(contato => {
      return this.removerAcentos(contato.nome).toLowerCase().includes(this.removerAcentos(this.filtroPorTexto).toLowerCase());
    })
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter(contato => {
      return contato.nome.toLowerCase().startsWith(letra)
    })
  }

}
