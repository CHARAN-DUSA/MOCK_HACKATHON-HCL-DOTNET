import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/Sidebar/Sidebar.component').then(m => m.ShellComponent)
  },
  { path: '**', redirectTo: '' }
];
