import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <div><strong>🏦 Reconcile Dashboard</strong></div>
      <nav>
        <a routerLink="/">Dashboard</a>
        <a routerLink="/reports">Reports</a>
        <a routerLink="/ledger">Ledger</a>
      </nav>
    </header>
    <div class="container"><router-outlet></router-outlet></div>
  `
})
export class AppComponent {}
