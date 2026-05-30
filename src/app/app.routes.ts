import { Routes } from '@angular/router';

export const routes: Routes = [
  /*{
    path: 'selector',
    loadComponent: () => import('./core/selector/selector.component').then(m => m.SelectorComponent)
  },*/
  {
    path: '**',
    redirectTo: ''
  }
];
