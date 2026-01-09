export interface Film {
  id: number,
  title: string,
  overview: string,
  release_date: string,
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

export interface FilmsResponse {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}

export interface FilmDetails extends Film {
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  similar: {
    results: SimilarMovie[];
  };
  genres: Array<{
    id: number;
    name: string;
  }>;
  runtime: number | null;
  budget: number;
  revenue: number;
  tagline: string;
}
