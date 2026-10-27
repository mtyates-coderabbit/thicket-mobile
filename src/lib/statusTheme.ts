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

const FALLBACK_THEME: Omit<StatusTheme, 'label'> = { color: '#5b605c', background: '#ecebe6' };

/** Turns an enum value such as PARTIALLY_REFUNDED into "Partially refunded". */
function humanize(status: string): string {
  const words = status.toLowerCase().split('_');
  return [words[0].charAt(0).toUpperCase() + words[0].slice(1), ...words.slice(1)].join(' ');
}

/**
 * Returns the display theme for an order status. Released app builds can
 * receive statuses added to the API after they shipped, so unknown values get
 * a neutral theme instead of crashing.
 */
export function getStatusTheme(status: OrderStatus | (string & {})): StatusTheme {
  return STATUS_THEME[status as OrderStatus] ?? { ...FALLBACK_THEME, label: humanize(status) };
}

/** Orders in these states no longer change and are grouped under "Past orders". */
export function isSettled(status: OrderStatus): boolean {
  return status === 'FULFILLED' || status === 'CANCELLED' || status === 'REFUNDED';
}
