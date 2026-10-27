import { describe, expect, it } from 'vitest';
import { purchaseEvent } from './analytics';

describe('purchaseEvent', () => {
  it('reports order value in cents', () => {
    expect(purchaseEvent({ number: 'TH-1001', total: 47.62 })).toEqual({
      name: 'purchase',
      orderNumber: 'TH-1001',
      valueCents: 4762,
      currency: 'USD',
    });
  });
});
