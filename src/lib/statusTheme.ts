import type { OrderStatus } from '../gql/graphql';

export interface StatusTheme {
  label: string;
  color: string;
  background: string;
}

const STATUS_THEME: Record<OrderStatus, StatusTheme> = {
  PENDING: { label: 'Pending', color: '#8a5a00', background: '#fbefd5' },
  PAID: { label: 'Paid', color: '#1d4f86', background: '#dde9f7' },
  FULFILLED: { label: 'Shipped', color: '#2f6b45', background: '#dcefe2' },
  CANCELLED: { label: 'Cancelled', color: '#5b605c', background: '#ecebe6' },
  REFUNDED: { label: 'Refunded', color: '#b4412f', background: '#f8e0db' },
};

export function getStatusTheme(status: OrderStatus): StatusTheme {
  return STATUS_THEME[status];
}

/** Orders in these states no longer change and are grouped under "Past orders". */
export function isSettled(status: OrderStatus): boolean {
  return status === 'FULFILLED' || status === 'CANCELLED' || status === 'REFUNDED';
}
