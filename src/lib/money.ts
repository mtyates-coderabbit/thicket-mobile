/** Formats an API amount in dollars, e.g. 47.6 → "$47.60". */
export function formatPrice(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  const [whole, cents] = Math.abs(amount).toFixed(2).split('.');
  return `${sign}$${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${cents}`;
}

/** Converts an API dollar amount to integer cents for analytics payloads. */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}
