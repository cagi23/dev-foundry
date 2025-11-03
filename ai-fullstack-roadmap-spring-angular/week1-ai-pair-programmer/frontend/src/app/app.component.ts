import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="container">
      <h1>User Dashboard</h1>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .container { max-width: 900px; margin: 2rem auto; font-family: Arial, sans-serif; }
  `]
})
export class AppComponent {}
