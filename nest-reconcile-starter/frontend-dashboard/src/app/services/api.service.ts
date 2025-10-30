import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
const API = (window as any).__API_BASE__ || 'http://localhost:3000/api';
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  reconcile(accountId: string) { return firstValueFrom(this.http.post(`${API}/reconcile?accountId=${accountId}`, {})); }
  latestReport(accountId: string) { return firstValueFrom(this.http.get(`${API}/reports/latest?accountId=${accountId}`)); }
  reportById(id: string) { return firstValueFrom(this.http.get(`${API}/reports/${id}`)); }
  listLedger() { return firstValueFrom(this.http.get(`${API}/ledger/transactions`)); }
  addLedger(tx: any) { return firstValueFrom(this.http.post(`${API}/ledger/transactions`, tx)); }
  importBank(accountId: string) { return firstValueFrom(this.http.get(`${API}/bank/import?accountId=${accountId}`)); }
}
