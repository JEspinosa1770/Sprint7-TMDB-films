import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilmDetails } from '../../core/models/film';
import { Api } from '../../core/services/api';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [],
  templateUrl: './film-detail.html'
})
export class FilmDetail implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  apiService = inject(Api)

  movie = signal<FilmDetails | null>(null);
  returnPage = signal<number>(1);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    const state = history.state;

    if (state && state.returnPage) {
      this.returnPage.set(state.returnPage);
    }

    const movieId = this.route.snapshot.paramMap.get('id');

    if (movieId) {
      await this.loadMovieDetails(Number(movieId));
    } else {
      this.router.navigate(['/']);
    }
  }

  async loadMovieDetails(id: number): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const details = await this.apiService.getFilmDetails(id);
      this.movie.set(details);
      this.isLoading.set(false);
    } catch (err) {
      console.error('Error loading movie details:', err);
      this.error.set('Error al cargar los detalles de la película');
      this.isLoading.set(false);
    }
  }
  goBack(): void {
    this.router.navigate(['/list'], {
      state: {
        returnToPage: this.returnPage()
      }
    });
  }

  getPosterUrl(path: string | null): string {
    return this.apiService.getImageUrl(path, 'w300');
  }
}
