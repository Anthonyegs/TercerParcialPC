import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Subscription } from 'rxjs'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
//modelo
import { Juego } from '../models/Juego.model'

const juegoQuery = gql`
  query getJuegos {
  juegos {
    id
    nombre
    descripcion
    foto
  }
}
`;

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  loading: boolean;
  currentJuego: any;
  dataSource: Juego[]
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: juegoQuery
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.dataSource = data.juegos;
        console.log(this.dataSource)
      });
  }
}
