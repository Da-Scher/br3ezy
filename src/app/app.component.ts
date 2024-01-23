import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>It's easy being br3ezy!</h1>
    <img src="../assets/br3ezy_logo_banner.png" alt="br3ezy logo">
    <p>Welcome to the br3ezy front end. It's good to have you. </p>
  ` ,
  styles: ['h1 { font-weight: normal; }']
})
export class AppComponent {
  title = 'test';
}
