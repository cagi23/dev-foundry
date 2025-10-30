import { describe, it, expect } from '@jest/globals';
function key(t: any) { return `${t.date}|${t.amount}|${t.currency}|${(t.description || '').trim().toLowerCase()}`; }
describe('key()', () => {
  it('normalizes whitespace and case in description', () => {
    const a = key({ date: '2025-10-01', amount: -10, currency: 'EUR', description: ' Spotify  ' });
    const b = key({ date: '2025-10-01', amount: -10, currency: 'EUR', description: 'spotify' });
    expect(a).toBe(b);
  });
});
