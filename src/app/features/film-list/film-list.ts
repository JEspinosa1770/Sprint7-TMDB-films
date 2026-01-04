import { Component, inject, OnInit, signal } from '@angular/core';
import { Api } from '../../core/services/api';
// import { Translate } from '../../core/services/translate'
import { Film, FilmsResponse } from '../../core/models/film';
import { ButtonsNav } from "../../layout/buttons-nav/buttons-nav";

@Component({
  selector: 'app-film-list',
  imports: [ButtonsNav],
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

  async onPreviousPage() {
    await this.loadMovies(this.currentPage() - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async onNextPage() {
    await this.loadMovies(this.currentPage() + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async onGoToPage(page: number) {
    await this.loadMovies(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // async nextPage() {
  //   if (this.currentPage() < this.totalPages()) {
  //     await this.loadMovies(this.currentPage() + 1);
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }

  // async previousPage() {
  //   if (this.currentPage() > 1) {
  //     await this.loadMovies(this.currentPage() - 1);
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }

  // async goToPage(page: number) {
  //   if (page >= 1 && page <= this.totalPages()) {
  //     await this.loadMovies(page);
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }
}
