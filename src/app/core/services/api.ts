import { Injectable } from '@angular/core';
import type { Film } from '../models/film';

@Injectable({
  providedIn: 'root',
})
export class Api {
  async getFilmsBlock(): Promise<Film | undefined> {
    const API_TMDB: string = 'https://api.themoviedb.org/3/movie/popular?page=1';
    const answer: Response = await fetch(API_TMDB);
    if (!answer.ok) {
        throw new Error(`Error HTTP: ${answer.status}`);
    }

    const dataFilm = await answer.json();
console.log(dataFilm)
    return dataFilm;
}
}


// export const getWeather = async (): Promise<DataWeather | undefined> => {
//     const API_WEATHER: string = 'https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true&language=es'
//     const answer: Response = await fetch(API_WEATHER);
//     if (!answer.ok) {
//         throw new Error(`Error HTTP: ${answer.status}`);
//     }

//     const dataWeather = await answer.json();

//     return dataWeather;
// }
