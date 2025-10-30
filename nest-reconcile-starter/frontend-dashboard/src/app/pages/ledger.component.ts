
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'app-ledger',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Ledger</h2>
    <form (ngSubmit)="add()">
      <div class="row">
        <input [(ngModel)]="form.id" name="id" placeholder="ID (ltxn_001)" required />
        <input [(ngModel)]="form.date" name="date" placeholder="YYYY-MM-DD" required />
        <input [(ngModel)]="form.amount" name="amount" type="number" placeholder="Amount" required />
        <input [(ngModel)]="form.currency" name="currency" placeholder="EUR" required />
      </div>
      <div class="row">
        <input [(ngModel)]="form.description" name="description" placeholder="Description" />
        <input [(ngModel)]="form.reference" name="reference" placeholder="Reference" />
      </div>
      <button class="btn">Add</button>
    </form>
  </div>

  <div class="card">
    <h3>Transactions</h3>
    <table class="table">
      <tr><th>ID</th><th>Date</th><th>Amount</th><th>Currency</th><th>Description</th><th>Reference</th></tr>
      <tr *ngFor="let t of items">
        <td>{{t._id}}</td><td>{{t.date}}</td><td>{{t.amount}}</td><td>{{t.currency}}</td><td>{{t.description}}</td><td>{{t.reference}}</td>
      </tr>
    </table>
  </div>
  `
})
export class LedgerComponent {
  form: any = { currency: 'EUR' };
  items: any[] = [];
  constructor(private api: ApiService) { this.load(); }
  async load() { this.items = await this.api.listLedger().catch(() => []); }
  async add() { await this.api.addLedger(this.form); this.form = { currency: 'EUR' }; this.load(); }
}
