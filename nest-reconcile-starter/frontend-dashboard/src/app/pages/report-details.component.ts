
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'app-report-details',
  imports: [CommonModule],
  template: `
  <div class="card" *ngIf="report">
    <h2>Report Details</h2>
    <p><strong>ID:</strong> {{report._id}}</p>
    <p><strong>Account:</strong> {{report.accountId}}</p>
    <p><strong>Run Date:</strong> {{report.runDate | date:'short'}}</p>

    <h3>Missing in Ledger ({{report.missingInLedgerDetails?.length || 0}})</h3>
    <table class="table" *ngIf="report.missingInLedgerDetails?.length">
      <tr><th>Date</th><th>Amount</th><th>Currency</th><th>Description</th><th>Counterparty</th></tr>
      <tr *ngFor="let t of report.missingInLedgerDetails">
        <td>{{t.date}}</td><td>{{t.amount}}</td><td>{{t.currency}}</td><td>{{t.description}}</td><td>{{t.counterparty}}</td>
      </tr>
    </table>

    <h3>Missing in Bank ({{report.missingInBankDetails?.length || 0}})</h3>
    <table class="table" *ngIf="report.missingInBankDetails?.length">
      <tr><th>Date</th><th>Amount</th><th>Currency</th><th>Description</th><th>Reference</th></tr>
      <tr *ngFor="let t of report.missingInBankDetails">
        <td>{{t.date}}</td><td>{{t.amount}}</td><td>{{t.currency}}</td><td>{{t.description}}</td><td>{{t.reference}}</td>
      </tr>
    </table>

    
    <h3>Fuzzy Matches ({{report.fuzzyDetails?.length || 0}})</h3>
    <table class="table" *ngIf="report.fuzzyDetails?.length">
      <tr><th>Similarity</th><th colspan="4">Bank</th><th colspan="4">Ledger</th></tr>
      <tr>
        <th></th>
        <th>Date</th><th>Amount</th><th>Currency</th><th>Description</th>
        <th>Date</th><th>Amount</th><th>Currency</th><th>Description</th>
      </tr>
      <tr *ngFor="let x of report.fuzzyDetails">
        <td>{{x.similarity}}</td>
        <td>{{x.bank?.date}}</td><td>{{x.bank?.amount}}</td><td>{{x.bank?.currency}}</td><td>{{x.bank?.description}}</td>
        <td>{{x.ledger?.date}}</td><td>{{x.ledger?.amount}}</td><td>{{x.ledger?.currency}}</td><td>{{x.ledger?.description}}</td>
      </tr>
    </table>

  </div>
  `
})
export class ReportDetailsComponent {
  report: any = null;
  constructor(route: ActivatedRoute, private api: ApiService) {
    const id = route.snapshot.params['id'];
    this.api.reportById(id).then(r => this.report = r).catch(() => this.report = null);
  }
}
