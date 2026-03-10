import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'purchaseorder',
    loadComponent: () => import('./components/purchaseorder.component').then(m => m.PurchaseOrderComponent)
  },
  {
    path: 'workcentre',
    loadComponent: () => import('./components/workcentre.component').then(m => m.WorkCentreComponent)
  },
  {
    path: 'routing',
    loadComponent: () => import('./components/routing.component').then(m => m.RoutingComponent)
  }
];
