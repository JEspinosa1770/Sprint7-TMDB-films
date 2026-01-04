import { Component, inject, OnInit, signal } from '@angular/core';
import { Api } from '../../core/services/api';
import { Film, FilmsResponse } from '../../core/models/film';

@Component({
  selector: 'app-film-list',
  imports: [],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
})
export class FilmList implements OnInit {
  private apiService = inject(Api);

  movies = signal<Film[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  getImageUrl(path: string | null, size: string = 'w780'): string {
    if (!path) {
      return 'https://via.placeholder.com/780x439?text=No+Image'; 
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  async ngOnInit() {
    await this.loadMovies(1);
  }

  async loadMovies(page: number) {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result: FilmsResponse = await this.apiService.getFilmsBlock(page);
console.log(result);
      this.movies.set(result.results);
      this.currentPage.set(result.page);
      this.totalPages.set(result.total_pages);
      this.isLoading.set(false);
    } catch (err) {
console.error(err);
      this.error.set('Error al cargar las películas');
      this.isLoading.set(false);
    }
  }

  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWRjMWQ5ZjExYjg4Mjg5NTZiMjVkMzdjZmMxNTkzNiIsIm5iZiI6MTc2NjM0MTkzNy40NTQwMDAyLCJzdWIiOiI2OTQ4M2QzMWQzMDNhNmJjMjc4ZWI2NjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Pjv-_hq-jmVRgSRR2aH_LsrPSKcAQzcMhNzBGGVtKb0");

  //   const requestOptions: RequestInit = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow"
  //   };

  //   fetch("https://api.themoviedb.org/3/movie/popular?page=1", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));
  // }
}
