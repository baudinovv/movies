import { defineStore } from "pinia";

import MovieDetails from '../interfaces/Movie/MovieDetails';
import MovieVideo from "../interfaces/Movie/MovieVideo";
import Credits from "../interfaces/Movie/Credits";
import { Recommendations } from "../interfaces/Movie/Recommendations";
import Movie from "../interfaces/Movie/Movie";
import TV from "../interfaces/TV/TV";
import { MovieImages } from "../interfaces/Movie/MovieImages";
import { TVDetails } from "../interfaces/TV/TVDetails";
import { TVImages } from "../interfaces/TV/TVImages";

export const useStoreDetails = defineStore(('details'), {
  state: () => {
    return {
      details :  {} as MovieDetails | TVDetails,
      credits : {} as Credits,
      language : "ru-RU" as String,
      director: "" as String,
      prodCompanies: [] as String[],
      recommendations: {} as Recommendations,
      videos: {} as MovieVideo,
      apiKey: import.meta.env.VITE_APP_API_KEY,
      headliner: {} as Movie | TV,
      popularMovies: {} as Movie[],
      topRatedMovies: {} as Movie[],
      upcomingMovies: {} as Movie[],
      popularTV: {} as TV[],
      topRatedTV: {} as TV[],
      onAirTV: {} as TV[],
      images: {} as MovieImages,
      headlinerId: 0 as Number
    }
  },
  actions : {
    async getPopularMovies() {
      const url =
        `https://api.themoviedb.org/3/movie/now_playing?language=${this.language}&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: any) => {
        this.headliner = res.results[0];
        this.popularMovies = res.results;
        this.headlinerId = res.results[0].id
        console.log("headliner on homepage: ", this.headliner)
        console.log("popularMovies: ", this.popularMovies);
      }).catch((err: Error) => console.error(err));
    },

    async getTV() {
      const url = `https://api.themoviedb.org/3/tv/popular?language=${this.language}&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.apiKey}`
        }
      };

      let responseTV = await fetch(url, options);
      let result = responseTV.json();
      result.then((res: any) => {
        this.popularTV = res.results;
        this.headlinerId = res.results[0].id;
        console.log("popularTV: ", res);
      }).catch((err: Error) => console.error(err));
    },

    async getDetails(id: Number | string, type: string) {
      const url =
      `https://api.themoviedb.org/3/${type}/${id}?language=${this.language}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: any) => {
        console.log("details :", res); //debug
        this.details = res; // set into pinia's store
      }).catch((err: Error) => console.error(err));
    },
    async getRecommendations(id : Number | string, type: string) {
      const url =
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=${this.language}&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: Recommendations) => {
        this.recommendations = res;
        console.log("recom: ", res);
      }).catch((err: Error) => console.error(err));
    },
    async getCredits(id : Number | string, type: string) {
      const url =
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=${this.language}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: Credits) => {
        console.log("credits: ", res);
        this.credits = res;
        for(let item of res.crew){
          if(item.job == "Director"){
            this.director = item.name;
          }
        }
      }).catch((err: Error) => console.error(err));
    },

    getProdCompanies(){
      if(this.details.production_companies){
        this.prodCompanies = [];
        for(let item of this.details.production_companies){
          this.prodCompanies.push(item.name);
        }
      } 
    },
    async getVideos(id : Number, type: string) {
      const url =
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=${this.language}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: MovieVideo) => {
        this.videos = res;
        console.log("video: ",res);
      }).catch((err: Error) => console.error(err));
    },
    async getImages(id: Number, type : string){
      const url =
      `https://api.themoviedb.org/3/${type}/${id}/images?language${this.language.substring(0, 2)}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: MovieImages | TVImages) => {
        this.images = res;
        console.log("images: ",res);
      }).catch((err: Error) => console.error(err));
    },
    async getTopRated(type: string) {
      const url = `https://api.themoviedb.org/3/${type}/top_rated?language=${this.language}&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.apiKey}`
        }
      };

      let response = await fetch(url, options);
      let result = response.json();
      result.then((res: any) => {
        (type === 'tv') ? this.topRatedTV = res.results : this.topRatedMovies = res.results; 
        console.log(`topRated${type.toUpperCase()} :`, this.topRatedMovies);
      }).catch((err: Error) => console.error(err));
    },
    async getUpcoming(type: string) {
      const url = `https://api.themoviedb.org/3/${type}/upcoming?language=${this.language}&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.apiKey}`
        }
      };

      let response = await fetch(url, options);
      let result = response.json();
      result.then((res: any) => {
        this.upcomingMovies = res.results;
        console.log("upcomingMovies :", this.upcomingMovies);
      }).catch((err: Error) => console.error(err));
    },
    async getOnAir() {
      const url = `https://api.themoviedb.org/3/tv/on_the_air?language=${this.language}&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.apiKey}`
        }
      };

      let responseTV = await fetch(url, options);
      let result = responseTV.json();
      result.then((res: any) => {
        this.onAirTV = res.results;
        console.log("on air TV: ", res);
      }).catch((err: Error) => console.error(err));
    },
  }
});