import { toCents } from './money';

export interface PurchaseEvent {
  name: 'purchase';
  orderNumber: string;
  valueCents: number;
  currency: 'USD';
}

export function purchaseEvent(order: { number: string; total: number }): PurchaseEvent {
  return { name: 'purchase', orderNumber: order.number, valueCents: toCents(order.total), currency: 'USD' };
}

export function track(event: PurchaseEvent): void {
  if (__DEV__) console.log('[analytics]', event);
}
