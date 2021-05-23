import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'logs',
    loadChildren: () => import('./pages/logs/logs.module').then( m => m.LogsPageModule)
  },
  {
    path: 'event-list',
    loadChildren: () => import('./pages/event-list/event-list.module').then( m => m.EventListPageModule)
  },
  {
    path: 'event-details/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./pages/event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'event-list2',
    loadChildren: () => import('./pages/event-list2/event-list2.module').then( m => m.EventList2PageModule)
  },
  {
    path: 'view-details/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./pages/view-details/view-details.module').then( m => m.ViewDetailsPageModule)
  },
  {
    path: 'enter-contact-details',
    loadChildren: () => import('./pages/enter-contact-details/enter-contact-details.module').then( m => m.EnterContactDetailsPageModule)
  },
  {
    path: 'publish-message',
    loadChildren: () => import('./pages/publish-message/publish-message.module').then( m => m.PublishMessagePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
