import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createTokenForExternalReference } from '@angular/compiler/src/identifiers';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {
  event = new EventEmitter<any>();

  textForm!: FormGroup;

  public apiGreeting = '';
  public dataHora = '';
  public texto = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.textForm = new FormGroup({
      text: new FormControl('', [Validators.required])
    })


    this.apiService.getHello().pipe(
      catchError((err) => {
        this.apiGreeting = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.apiGreeting = response.mensagem;
      }
    });

    this.apiService.getDataHora().pipe(
      catchError((err) => {
        this.dataHora = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.dataHora = response.data_hora;
      }
    });   
  }

  get text() {
    return this.textForm.get('text')!;
  }

  async submit() {
    if (this.textForm.invalid) {
      return;
    }
    this.apiService.getTexto(this.textForm.value).subscribe((response) => {
      console.log(response)
    })
  

  }

}
