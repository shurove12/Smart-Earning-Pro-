import { CurrencyType } from '../types';
import { CURRENCY_RATES, CURRENCY_SYMBOLS } from '../mockData';

export function formatCurrency(amountUSD: number, currency: CurrencyType): string {
  const rate = CURRENCY_RATES[currency] || 1;
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const converted = amountUSD * rate;

  if (currency === 'USD') {
    return `${symbol} ${converted.toFixed(2)}`;
  }
  return `${symbol} ${converted.toFixed(1)}`;
}
