import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../core/services/api';

@Component({
  selector: 'app-film-list',
  imports: [],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
})
export class FilmList implements OnInit {
  private apiService = inject(Api);

  ngOnInit() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWRjMWQ5ZjExYjg4Mjg5NTZiMjVkMzdjZmMxNTkzNiIsIm5iZiI6MTc2NjM0MTkzNy40NTQwMDAyLCJzdWIiOiI2OTQ4M2QzMWQzMDNhNmJjMjc4ZWI2NjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Pjv-_hq-jmVRgSRR2aH_LsrPSKcAQzcMhNzBGGVtKb0");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://api.themoviedb.org/3/movie/popular?page=1", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
}
