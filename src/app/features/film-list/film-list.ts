import { Component, inject, OnInit, signal } from '@angular/core';
import { Api } from '../../core/services/api';
// import { Translate } from '../../core/services/translate'
import { Film, FilmsResponse } from '../../core/models/film';

@Component({
  selector: 'app-film-list',
  imports: [],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
})
export class FilmList implements OnInit {
  private apiService = inject(Api);
  // translationService = inject(Translate);

  movies = signal<Film[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  getImageUrl(path: string | null, size: string = 'w780'): string {
    if (!path) {
      return 'error.png';
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
}
