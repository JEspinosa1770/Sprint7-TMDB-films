import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Film } from '../../core/models/film';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [],
  templateUrl: './film-detail.html'
})
export class FilmDetail implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  movie = signal<Film | null>(null);
  returnPage = signal<number>(1);

  ngOnInit(): void {
    const state = history.state;
    console.log('State:', state);

    if (state && state.movie) {
      this.movie.set(state.movie);
      this.returnPage.set(state.returnPage || 1);
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/list'], {
      state: {
        returnToPage: this.returnPage()
      }
    });
  }


  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) {
      return 'error.png';
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  getPosterUrl(path: string | null): string {
    return this.getImageUrl(path, 'w300');
  }
}
