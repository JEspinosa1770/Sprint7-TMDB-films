import { Injectable } from '@angular/core';
import type { FilmsResponse } from '../models/film';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly API_URL = 'https://api.themoviedb.org/3';
  private readonly API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWRjMWQ5ZjExYjg4Mjg5NTZiMjVkMzdjZmMxNTkzNiIsIm5iZiI6MTc2NjM0MTkzNy40NTQwMDAyLCJzdWIiOiI2OTQ4M2QzMWQzMDNhNmJjMjc4ZWI2NjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Pjv-_hq-jmVRgSRR2aH_LsrPSKcAQzcMhNzBGGVtKb0';

  async getFilmsBlock(page: number = 1): Promise<FilmsResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.API_TOKEN}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${this.API_URL}/movie/popular?page=${page}`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) {
      return 'error.png';
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}
