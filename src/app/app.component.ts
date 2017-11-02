import { Component } from '@angular/core';


export class Hero{
  id: number; /* variable declaration, name: type */
  name: string;
}

/*
* Decorator = Annotation
*Component Decorator:
* requires a selector (Element to attach to) and template/templateUrl (template means html)
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Heroes App!';
  hero : Hero = {
    id: 1,
    name: 'Minus'
  } ;
}
