import { Routes } from "@angular/router";
import { Moviepage1Component } from "./moviepage1/moviepage1.component";
import { Moviepage2Component } from "./moviepage2/moviepage2.component";
import { MovieSelectedComponent } from "./movie-selected/movie-selected.component";
import { BillboardComponent } from "./billboard/billboard.component";

export const routes: Routes = [
  {
    path: 'moviepage1', component: Moviepage1Component
  },
  {
    path: 'moviepage2', component: Moviepage2Component
  },
  {
    path: 'movieSelected/:id', component: MovieSelectedComponent
  },
  {
    path: '', component: BillboardComponent
  }
]
