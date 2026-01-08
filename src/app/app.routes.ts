import { Routes } from '@angular/router';
import { FilmList } from './features/film-list/film-list';
import { FilmDetail } from './features/film-detail/film-detail';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Component } from '@angular/core';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'list', component: FilmList },
  { path: 'movie/:id', component: FilmDetail },
  { path: 'login', component: Login },
  { path: 'register', component: Register},
  { path: "**", redirectTo: ''}
];
