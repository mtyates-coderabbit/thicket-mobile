import { describe, expect, it } from 'vitest';
import type { OrderStatus } from '../gql/graphql';
import { getStatusTheme, isSettled } from './statusTheme';

const ALL: OrderStatus[] = ['PENDING', 'PAID', 'FULFILLED', 'CANCELLED', 'REFUNDED'];

describe('status theme', () => {
  it('has a theme for every status', () => {
    for (const status of ALL) {
      expect(getStatusTheme(status).label).toBeTruthy();
    }
  });

  it('groups terminal statuses as settled', () => {
    expect(ALL.filter(isSettled)).toEqual(['FULFILLED', 'CANCELLED', 'REFUNDED']);
  });

  it('falls back to a neutral theme for statuses this build does not know', () => {
    expect(getStatusTheme('PARTIALLY_REFUNDED')).toEqual({
      label: 'Partially refunded',
      color: '#5b605c',
      background: '#ecebe6',
    });
  });
});
