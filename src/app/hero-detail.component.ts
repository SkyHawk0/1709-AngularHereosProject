import { Component, Input, OnInit } from '@angular/core';
import { Hero } from './hero';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';
 
import 'rxjs/add/operator/switchMap';

/*
1. The component class name should be written in upper camel case and end in the word "Component".
2. The component file name should be spelled in lower dash case, each word separated by dashes, and end in .component.ts. 
*/
@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})

//Always export the component class because you'll always import it elsewhere.
// Similar to public class in Java

export class HeroDetailComponent implements OnInit{
    ngOnInit(): void {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
        .subscribe(hero => this.hero = hero);
    } 
    //Attribute Directive
    @Input() hero: Hero;

    constructor(
      private heroService: HeroService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    goBack(): void {
      this.location.back();
    }

    save(): void {
      this.heroService.update(this.hero)
        .then(() => this.goBack());
    }
}