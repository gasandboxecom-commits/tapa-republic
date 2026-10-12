import { ADD_ONS, MENU } from "./menu";

export type CartLine = { key: string; itemId: string; quantity: number; addOnIds: string[] };
export type Fulfillment = "pickup" | "delivery";
export const DELIVERY_FEE = 49;

export function lineUnitTotal(line: CartLine) {
  const meal = MENU.find((item) => item.id === line.itemId);
  if (!meal) return 0;
  return meal.price + line.addOnIds.reduce((sum, id) => sum + (ADD_ONS.find((add) => add.id === id)?.price ?? 0), 0);
}
export function cartSubtotal(lines: CartLine[]) { return lines.reduce((sum, line) => sum + lineUnitTotal(line) * line.quantity, 0); }
export function orderTotal(lines: CartLine[], fulfillment: Fulfillment) { return cartSubtotal(lines) + (fulfillment === "delivery" && lines.length ? DELIVERY_FEE : 0); }
export type CheckoutDetails = { name: string; contact: string; address: string };
export function validateCheckout(lines: CartLine[], fulfillment: Fulfillment, details: CheckoutDetails) {
  const errors: Partial<Record<keyof CheckoutDetails | "cart", string>> = {};
  if (!lines.length) errors.cart = "Add at least one meal before checking out.";
  if (details.name.trim().length < 2) errors.name = "Enter your name.";
  if (!/^(?:\+?63|0)9\d{9}$/.test(details.contact.replace(/[\s-]/g, ""))) errors.contact = "Enter a valid Philippine mobile number.";
  if (fulfillment === "delivery" && details.address.trim().length < 8) errors.address = "Enter a complete delivery address.";
  return errors;
}
