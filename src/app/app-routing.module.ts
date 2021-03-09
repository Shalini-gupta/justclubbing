import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./clubweb/clubweb.module').then(m => m.ClubwebModule)

  },
  { path: 'owners-manage', loadChildren: () => import('./owners/owners.module').then(m => m.OwnersModule) }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
    RouterModule.forRoot(routes, { useHash: false })  // remove second argument
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
