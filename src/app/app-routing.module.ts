import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'choose-mode',
    loadChildren: () => import('./pages/choose-mode/choose-mode.module').then( m => m.ChooseModePageModule)
  },
  {
    path: 'learn-mode',
    loadChildren: () => import('./pages/learn-mode/learn-mode.module').then( m => m.LearnModePageModule)
  },
  {
    path: 'practice-mode',
    loadChildren: () => import('./pages/practice-mode/practice-mode.module').then( m => m.PracticeModePageModule)
  },
  {
    path: 'wordlist',
    loadChildren: () => import('./pages/wordlist/wordlist.module').then( m => m.WordlistPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
