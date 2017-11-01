import { Component } from '@angular/core';


export class Hero{
  id: number; /* variable declaration, name: type */
  name: string;
}

/*
*Component Decorator:
* requires a selector and template/templateUrl
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
