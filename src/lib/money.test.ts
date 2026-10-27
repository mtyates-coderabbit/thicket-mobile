import { describe, expect, it } from 'vitest';
import { formatPrice, toCents } from './money';

describe('money', () => {
  it('formats dollar amounts', () => {
    expect(formatPrice(47.6)).toBe('$47.60');
    expect(formatPrice(1234.5)).toBe('$1,234.50');
    expect(formatPrice(-5)).toBe('-$5.00');
  });

  it('converts dollars to cents', () => {
    expect(toCents(47.62)).toBe(4762);
    expect(toCents(0.1 + 0.2)).toBe(30);
  });
});
