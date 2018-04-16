import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/game'
  },
  {
    path: 'game',
    component: MinesweeperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
