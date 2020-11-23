import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './agregar/agregar.component'
import { ListarComponent } from './listar/listar.component'

const routes: Routes = [
  { path: 'listar-juegos', component: ListarComponent },
  { path: 'agregar-juego/:id', component: AgregarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
