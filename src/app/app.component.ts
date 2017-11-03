import { Component } from "@angular/core";

/*
Originally had this inside template:
    `<h1>{{title}}</h1>
     <my-heroes></my-heroes>
    `
*/

//routerLink: Another of the RouterModule's directives
// is bound to a string that tells the router where to navigate when the user clicks the link.
@Component({
    selector: 'app-root',
    template: `<h1>{{title}}</h1>
                <nav>
                <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
                <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
                </nav>
                <router-outlet></router-outlet>
                `,
    styleUrls:   [ './app.component.css' ]
    
      
                
})


export class AppComponent {
    title = 'Heroes App!';

}