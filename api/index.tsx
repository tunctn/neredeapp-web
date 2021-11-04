const API_KEY = process.env.TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";
const LANGUAGE = "tr";
const API_URL = "https://neredeapp-web-api.herokuapp.com/";

const api = {
  genres: (): Promise<any> => {
    const movieGenres = fetch(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`
    ).then((res) => res.json());
    const tvGenres = fetch(
      `${BASE_URL}genre/tv/list?api_key=${API_KEY}&language=${LANGUAGE}`
    ).then((res) => res.json());

    return Promise.all([movieGenres, tvGenres]);
  },
  popularMovies: (): Promise<any> => {
    return fetch(
      `${BASE_URL}movie/popular?api_key=${API_KEY}&page=1&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  nowPlayingMovies: (): Promise<any> => {
    return fetch(
      `${BASE_URL}movie/now_playing?api_key=${API_KEY}&page=1&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  movie: (id: string | number): Promise<any> => {
    return fetch(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&page=1&append_to_response=videos,images,credits,genres&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  popularTv: (): Promise<any> => {
    return fetch(
      `${BASE_URL}tv/popular?api_key=${API_KEY}&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  topRatedTv: (): Promise<any> => {
    return fetch(
      `${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  tv: (id: string | number): Promise<any> => {
    console.log(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&page=1&append_to_response=credits,genres&language=${LANGUAGE}`
    );
    return fetch(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&page=1&append_to_response=credits,genres&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  tvMedia: (id: string | number): Promise<any> => {
    return fetch(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&page=1&append_to_response=videos,images`
    ).then((res) => res.json());
  },
  popularActors: (): Promise<any> => {
    return fetch(
      `${BASE_URL}person/popular?api_key=${API_KEY}&page=1&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  actor: (id: string | number): Promise<any> => {
    return fetch(
      `${BASE_URL}person/${id}?api_key=${API_KEY}&page=1&append_to_response=combined_credits,external_ids&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  search: (term: string): Promise<any> => {
    return fetch(
      `${BASE_URL}search/multi?api_key=${API_KEY}&include_adult=true&query=${term}&language=${LANGUAGE}`
    ).then((res) => res.json());
  },
  providers: (params: any): Promise<any> => {
    const { type, id, country = "tr" } = params[0];
    const url = `${API_URL}tmdb/${type}/${id}?country=${country}`;
    console.log(url);
    return fetch(url).then((res) => res.json());
  },
};

export default api;
