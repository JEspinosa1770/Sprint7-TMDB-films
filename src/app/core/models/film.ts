export interface Film {
  id: number,
  title: string,
  overview: string,
  release_data: string,
  original_language: string,
  backdrop_path: string,
  poster_path: string,
  original_title: string,
  adult: boolean,
  popularity: number,
  genre_ids: number[],
  video: boolean,
  vote_average: number,
  vote_count: number
}
