import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

 


/*
* Decorator = Annotation
*Component Decorator:
* requires a selector (Element to attach to) and template/templateUrl (template means html)
*/
@Component({
  selector: 'my-heroes',
  templateUrl: './app.component.html',
  styleUrls: ['./hero.component.css'],
})

/*
Don't use new with services
The component has to know how to create a HeroService. 
If you change the HeroService constructor, you must find and update every place you created the service. 
Patching code in multiple places is error prone and adds to the test burden.
You create a service each time you use new. What if the service caches heroes and shares that cache with others? You couldn't do that.
With the AppComponent locked into a specific implementation of the HeroService, switching implementations for different scenarios, such as operating offline or using different mocked versions for testing, would be difficult.
Injectable makes it a Singleton
*/
export class HeroesComponent implements OnInit {
  //component lifecycle: at creation, after each change, and at its eventual destruction.
  ngOnInit(): void {
    this.getHeroes();
  }
  
  heroes: Hero[];
  selectedHero: Hero;
  
  // Previous - constructor(private heroService: HeroService) { }
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    //Before Promise - this.heroes = this.heroService.getHeroes();
    //heroes => this.heroes = heroes) - Lambda experession, shorthand for writing functions, left side is parameter, right is function body
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  //For adding
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  //For deleting Heroes
  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }
  
}
