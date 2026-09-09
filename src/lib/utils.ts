export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
