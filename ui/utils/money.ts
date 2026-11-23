export type Cents = number;

export function parseMoney(text: string): Cents {
  const match = text.match(/\$\s*(\d+(?:,\d{3})*)\.(\d{2})/);
  if (!match) throw new Error(`Cannot parse a dollar amount from "${text}"`);
  return Number(match[1].replace(/,/g, '')) * 100 + Number(match[2]);
}

export function sumCents(values: Cents[]): Cents {
  return values.reduce((total, value) => total + value, 0);
}

export function taxOn(amount: Cents, rate: number): Cents {
  return Math.round(amount * rate);
}

export function formatMoney(amount: Cents): string {
  return `$${(amount / 100).toFixed(2)}`;
}
