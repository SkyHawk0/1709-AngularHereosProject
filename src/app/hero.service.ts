import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';


//@Injectable - Decorator - adding ​from the start ensures consistency and future-proofing.
@Injectable()
export class HeroService {

    /*
    A Promise essentially promises to call back when the results are ready. 
    You ask an asynchronous service to do some work and give it a callback function. 
    The service does that work and eventually calls the function with the results or an error.
    */

    /*
    Old version 
    getHeroes(): Promise<Hero[]> {
         return Promise.resolve(HEROES);
     }
     Needs this - import { HEROES } from './mock-heroes';
     */

    private heroesUrl = 'api/heroes';  // URL to web api
    
    constructor(private http: Http) { }
    
    getHeroes(): Promise<Hero[]> {
      return this.http.get(this.heroesUrl)
                 .toPromise()
                 .then(response => response.json() as Hero[])
                 .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    //Above added in HTTP section

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
          // Simulate server latency with 2 second delay
          setTimeout(() => resolve(this.getHeroes()), 2000);
        });
      }

      /* Old version: Got all hero's and then selected the desired one
    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
      }
      */

      //This version only gets the desired hero
      getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Hero)
          .catch(this.handleError);
      }

      //Added for saving
      private headers = new Headers({'Content-Type': 'application/json'});
      
      update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
          .put(url, JSON.stringify(hero), {headers: this.headers})
          .toPromise()
          .then(() => hero)
          .catch(this.handleError);
      }

      //For adding Heroes
      create(name: string): Promise<Hero> {
        return this.http
          .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
          .toPromise()
          .then(res => res.json() as Hero)
          .catch(this.handleError);
      }

      //For Deleting
      delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
      }
}

