import type { OrderReceiptQuery } from '../gql/graphql';

type ReceiptPayment = NonNullable<OrderReceiptQuery['order']>['payment'];

export function paymentLine(payment: ReceiptPayment): string {
  const method = payment.method === 'card' ? `Card •••• ${payment.last4 ?? '????'}` : 'PayPal';
  return payment.status === 'AUTHORIZED' ? `${method} (pending charge)` : method;
}
