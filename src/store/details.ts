import { defineStore } from 'pinia';
import type MovieDetails from '../interfaces/Movie/MovieDetails';
import type MovieVideo from '../interfaces/Movie/MovieVideo';
import type Credits from '../interfaces/Movie/Credits';
import type { Recommendations } from '../interfaces/Movie/Recommendations';
import type Movie from '../interfaces/Movie/Movie';
import type TV from '../interfaces/TV/TV';
import type { MovieImages } from '../interfaces/Movie/MovieImages';
import type { TVDetails } from '../interfaces/TV/TVDetails';
import type { TVImages } from '../interfaces/TV/TVImages';

const API_BASE = 'https://api.themoviedb.org/3';
const LANGUAGE = 'ru-RU';
const API_KEY = import.meta.env.VITE_APP_API_KEY as string;

export const useStoreDetails = defineStore('details', {
  state: () => ({
    details: {} as MovieDetails | TVDetails,
    credits: {} as Credits,
    director: '' as string,
    prodCompanies: [] as string[],
    recommendations: {} as Recommendations,
    videos: {} as MovieVideo,
    headliner: {} as Movie | TV,
    popularMovies: [] as Movie[],
    topRatedMovies: [] as Movie[],
    upcomingMovies: [] as Movie[],
    popularTV: [] as TV[],
    topRatedTV: [] as TV[],
    onAirTV: [] as TV[],
    images: {} as MovieImages | TVImages,
    headlinerId: 0 as number,
  }),

  actions: {
    async _fetch<T>(path: string): Promise<T> {
      const res = await fetch(`${API_BASE}${path}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
      return res.json();
    },

    async getPopularMovies() {
      const data = await this._fetch<{ results: Movie[] }>(`/movie/now_playing?language=${LANGUAGE}&page=1`);
      this.popularMovies = data.results;
      this.headliner = data.results[0];
      this.headlinerId = data.results[0].id;
    },

    async getTV() {
      const data = await this._fetch<{ results: TV[] }>(`/tv/popular?language=${LANGUAGE}&page=1`);
      this.popularTV = data.results;
      this.headlinerId = data.results[0].id;
    },

    async getDetails(id: number | string, type: string) {
      this.details = await this._fetch<MovieDetails | TVDetails>(`/${type}/${id}?language=${LANGUAGE}`);
    },

    async getRecommendations(id: number | string, type: string) {
      this.recommendations = await this._fetch<Recommendations>(
        `/${type}/${id}/recommendations?language=${LANGUAGE}&page=1`,
      );
    },

    async getCredits(id: number | string, type: string) {
      const data = await this._fetch<Credits>(`/${type}/${id}/credits?language=${LANGUAGE}`);
      this.credits = data;
      this.director = data.crew.find(c => c.job === 'Director')?.name ?? '';
    },

    getProdCompanies() {
      if (this.details.production_companies) {
        this.prodCompanies = this.details.production_companies.map(c => c.name);
      }
    },

    async getVideos(id: number, type: string) {
      this.videos = await this._fetch<MovieVideo>(`/${type}/${id}/videos?language=${LANGUAGE}`);
    },

    async getImages(id: number, type: string) {
      const lang = LANGUAGE.substring(0, 2);
      this.images = await this._fetch<MovieImages | TVImages>(`/${type}/${id}/images?language=${lang}`);
    },

    async getTopRated(type: string) {
      const data = await this._fetch<{ results: any[] }>(`/${type}/top_rated?language=${LANGUAGE}&page=1`);
      if (type === 'tv') this.topRatedTV = data.results;
      else this.topRatedMovies = data.results;
    },

    async getUpcoming(type: string) {
      const data = await this._fetch<{ results: Movie[] }>(`/${type}/upcoming?language=${LANGUAGE}&page=1`);
      this.upcomingMovies = data.results;
    },

    async getOnAir() {
      const data = await this._fetch<{ results: TV[] }>(`/tv/on_the_air?language=${LANGUAGE}&page=1`);
      this.onAirTV = data.results;
    },
  },
});
