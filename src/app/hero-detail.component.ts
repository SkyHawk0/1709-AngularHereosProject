import { Component, Input } from '@angular/core';
import { Hero } from './hero';

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

export class HeroDetailComponent {
    //Attribute Directive
    @Input() hero: Hero;
}