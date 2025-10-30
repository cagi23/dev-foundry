const express = require('express');
const app = express();
app.get('/api/v1/transactions', (req, res) => {
  res.json([
    { id: 'btxn_001', date: '2025-10-01', amount: -55.9, currency: 'EUR', description: 'Spotify Premium', counterparty: 'Spotify AB' },
    { id: 'btxn_002', date: '2025-10-02', amount: -12.99, currency: 'EUR', description: 'iCloud', counterparty: 'Apple' },
    { id: 'btxn_003', date: '2025-10-03', amount: 1500, currency: 'EUR', description: 'Salary', counterparty: 'ACME S.p.A.' }
  ]);
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Mock bank on http://localhost:${port}`));
