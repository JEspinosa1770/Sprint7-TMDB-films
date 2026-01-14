import { Routes } from '@angular/router';
import { FilmList } from './features/film-list/film-list';
import { FilmDetail } from './features/film-detail/film-detail';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'list', component: FilmList, canActivate: [authGuard] },
  { path: 'movie/:id', component: FilmDetail, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register},
  { path: "**", redirectTo: ''}
];
