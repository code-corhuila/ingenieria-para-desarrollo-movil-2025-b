import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( c => c.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list.page').then( c => c.ListPage)
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add/add.page').then( c => c.AddPage)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail/detail.page').then( c => c.DetailPage)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
