import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Juego } from '../models/Juego.model'
import { Subscription } from 'rxjs'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  titulo: string
  button: string
  buttonColor: string
  idJuego: number
  juego: Juego
  dataSource: Juego[]
  private querySubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private apollo: Apollo,
  ) {
    this.juego = new Juego()
  }




  guardar() {
    if (this.juego.nombre == "" || this.juego.descripcion == "" || this.juego.foto == "") {

    } else {
      if (this.idJuego == 0) {
        const enviarJuego = gql(`
          mutation createJuego {
            createJuego(input:{
              nombre:"`+ this.juego.nombre + `"
              descripcion: "`+ this.juego.descripcion + `"
              foto:"`+ this.juego.foto + `"
            }){
              ok
              juego{
                id
                nombre
                descripcion
                foto
              }
            }
          }
        `);
        this.apollo.mutate({
          mutation: enviarJuego
        }).subscribe(() => {
          this._router.navigate(['/listar-juegos'])
        });

      }
      else {
        const enviarJuego = gql(`
          mutation createJuego {
            updateJuego(id:`+ this.idJuego + `,input:{
              nombre:"`+ this.juego.nombre + `"
              descripcion: "`+ this.juego.descripcion + `"
              foto:"`+ this.juego.foto + `"
            }){
              ok
              juego{
                id
                nombre
                descripcion
                foto
              }
            }
          }
        `);
        this.apollo.mutate({
          mutation: enviarJuego
        }).subscribe(() => {
          this._router.navigate(['/listar-juegos'])
        });
      }
    }
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.idJuego = +params.get('id');
    });
    if (this.idJuego == 0) {
      this.titulo = "Nuevo juego"
      this.button = "Crear"
      this.buttonColor = "success"
      this.juego.nombre = ""
      this.juego.descripcion = ""
      this.juego.foto = ""
    }
    else {
      this.titulo = "Modificar juego"
      this.button = "Modificar"
      this.buttonColor = "warning"
      this.querySubscription = this.apollo.watchQuery<any>({
        query: juegoQuery
      })
        .valueChanges
        .subscribe(({ data }) => {
          this.dataSource = data.juegos;
          this.dataSource.map(d => {
            if (d.id == this.idJuego) {
              this.juego.nombre = d.nombre
              this.juego.descripcion = d.descripcion
              this.juego.foto = d.foto
            }
          })

        });

    }
  }

}
