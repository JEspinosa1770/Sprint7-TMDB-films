import { Injectable } from '@angular/core';
import type { FilmDetails, FilmsResponse } from '../models/film';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly API_URL = 'https://api.themoviedb.org/3';
  private readonly API_TOKEN = environment.tmdbApiToken;

  async getFilmsBlock(page: number = 1): Promise<FilmsResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.API_TOKEN}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${this.API_URL}/movie/popular?page=${page}&language=es-ES`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) {
      return 'error1.png';
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  async getFilmDetails(movieId: number): Promise<FilmDetails> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.API_TOKEN}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${this.API_URL}/movie/${movieId}?language=es-ES&append_to_response=credits,similar`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}
