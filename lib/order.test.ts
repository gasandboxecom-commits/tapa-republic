import { describe, expect, it } from "vitest";
import { ADD_ONS, MENU } from "./menu";
import { cartSubtotal, DELIVERY_FEE, lineUnitTotal, orderTotal, validateCheckout, type CartLine } from "./order";

const tapa: CartLine = { key: "1", itemId: "tapsilog", quantity: 2, addOnIds: ["egg", "tea"] };

describe("menu data", () => {
  it("keeps all requested meal prices", () => expect(MENU.map(({ name, price }) => [name, price])).toEqual([
    ["Tapsilog",159],["Tocilog",149],["Longsilog",139],["Bangsilog",169],["Sisigsilog",179],["Cornsilog",129],["Hotsilog",119],["Chickensilog",169],
  ]));
  it("keeps all requested add-on prices", () => expect(ADD_ONS.map(({ name, price }) => [name, price])).toEqual([
    ["Extra Garlic Rice",30],["Extra Fried Egg",25],["Extra Beef Tapa",65],["Extra Atchara",20],["Bottled Water",25],["Iced Tea",45],["Soft Drinks",40],
  ]));
});

describe("cart calculations", () => {
  it("includes add-ons in each unit", () => expect(lineUnitTotal(tapa)).toBe(229));
  it("multiplies configured lines by quantity", () => expect(cartSubtotal([tapa])).toBe(458));
  it("adds no pickup fee", () => expect(orderTotal([tapa], "pickup")).toBe(458));
  it("adds exactly the sample delivery fee", () => expect(orderTotal([tapa], "delivery")).toBe(458 + DELIVERY_FEE));
  it("does not charge delivery on an empty cart", () => expect(orderTotal([], "delivery")).toBe(0));
});

describe("checkout validation", () => {
  it("rejects empty orders and invalid details", () => expect(validateCheckout([], "delivery", { name: "", contact: "123", address: "" })).toEqual(expect.objectContaining({ cart: expect.any(String), name: expect.any(String), contact: expect.any(String), address: expect.any(String) })));
  it("allows pickup without an address", () => expect(validateCheckout([tapa], "pickup", { name: "Juan", contact: "09171234567", address: "" })).toEqual({}));
  it("accepts delivery with complete details", () => expect(validateCheckout([tapa], "delivery", { name: "Juan", contact: "+639171234567", address: "12 Mabini Street" })).toEqual({}));
});
