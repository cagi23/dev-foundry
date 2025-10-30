
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'app-reports-list',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card">
      <h2>Reports</h2>
      <p>This page shows the latest report. Extend the backend to return a list.</p>
      <button class="btn" (click)="refresh()">Refresh</button>
    </div>

    <div class="card" *ngIf="latest">
      <h3>Latest Report</h3>
      <table class="table">
        <tr><th>Run Date</th><th>Account</th><th>Matched</th><th>Missing in Ledger</th><th>Missing in Bank</th><th></th></tr>
        <tr>
          <td>{{latest.runDate | date:'short'}}</td>
          <td>{{latest.accountId}}</td>
          <td>{{latest.matched}}</td>
          <td>{{latest.missing_in_ledger}}</td>
          <td>{{latest.missing_in_bank}}</td>
          <td><a [routerLink]="['/details', latest._id]">View</a></td>
        </tr>
      </table>
    </div>
  `
})
export class ReportsListComponent {
  latest: any = null;
  constructor(private api: ApiService) { this.refresh(); }
  async refresh() { this.latest = await this.api.latestReport('acc_123').catch(() => null); }
}
