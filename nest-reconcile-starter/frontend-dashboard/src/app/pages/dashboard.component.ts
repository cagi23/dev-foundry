
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true, selector: 'app-dashboard', imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="card">
    <h2>Latest Reconciliation</h2>
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      <label>Account ID</label>
      <input [(ngModel)]="accountId" placeholder="acc_123"/>
      <button class="btn" (click)="runImport()" [disabled]="busy">Import Bank</button>
      <button class="btn" (click)="runRecon()" [disabled]="busy">Run Reconcile</button>
      <span *ngIf="busy" class="badge">Working...</span>
    </div>
  </div>
  <div class="card" *ngIf="report">
    <h3>Summary — <small>{{report.runDate | date:'short'}}</small></h3>
    <p>Account: <strong>{{report.accountId}}</strong></p>
    <table class="table">
      <tr><th>Matched</th><th>Fuzzy</th><th>Missing in Ledger</th><th>Missing in Bank</th><th>Details</th></tr>
      <tr>
        <td>{{report.matched}}</td>
        <td>{{report.missing_in_ledger}}</td>
        <td>{{report.missing_in_bank}}</td>
        <td><a [routerLink]="['/details', report._id]">Open</a></td>
      </tr>
    </table>
  </div>`
})
export class DashboardComponent {
  accountId = 'acc_123'; busy = false; report: any = null;
  constructor(private api: ApiService) { this.reload(); }
  async reload() { this.report = await this.api.latestReport(this.accountId).catch(() => null); }
  async runImport() { this.busy = true; try { await this.api.importBank(this.accountId); } finally { this.busy = false; this.reload(); } }
  async runRecon() { this.busy = true; try { await this.api.reconcile(this.accountId); } finally { this.busy = false; this.reload(); } }
}
