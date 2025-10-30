import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { ReportsListComponent } from './pages/reports-list.component';
import { ReportDetailsComponent } from './pages/report-details.component';
import { LedgerComponent } from './pages/ledger.component';
export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'reports', component: ReportsListComponent },
  { path: 'details/:id', component: ReportDetailsComponent },
  { path: 'ledger', component: LedgerComponent }
];
