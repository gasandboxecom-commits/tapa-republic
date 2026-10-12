export type AddOn = { id: string; name: string; price: number };
export type MenuItem = { id: string; name: string; price: number; description: string; tag?: string; tone: string };

export const MENU: MenuItem[] = [
  { id: "tapsilog", name: "Tapsilog", price: 159, description: "Sweet-savory beef tapa, sinangag, sunny egg & atchara", tag: "Republic favorite", tone: "tomato" },
  { id: "tocilog", name: "Tocilog", price: 149, description: "Caramelized pork tocino, sinangag, sunny egg & atchara", tone: "mustard" },
  { id: "longsilog", name: "Longsilog", price: 139, description: "Garlicky longganisa, sinangag, sunny egg & atchara", tag: "Pinoy classic", tone: "green" },
  { id: "bangsilog", name: "Bangsilog", price: 169, description: "Crisp boneless bangus, sinangag, sunny egg & tomato", tone: "blue" },
  { id: "sisigsilog", name: "Sisigsilog", price: 179, description: "Sizzling-style pork sisig, sinangag, sunny egg & calamansi", tag: "Big flavor", tone: "tomato" },
  { id: "cornsilog", name: "Cornsilog", price: 129, description: "Crispy corned beef, sinangag, sunny egg & atchara", tone: "mustard" },
  { id: "hotsilog", name: "Hotsilog", price: 119, description: "Pinoy red hotdogs, sinangag, sunny egg & banana ketchup", tone: "green" },
  { id: "chickensilog", name: "Chickensilog", price: 169, description: "Crispy fried chicken, sinangag, sunny egg & house gravy", tone: "blue" },
];

export const ADD_ONS: AddOn[] = [
  { id: "rice", name: "Extra Garlic Rice", price: 30 },
  { id: "egg", name: "Extra Fried Egg", price: 25 },
  { id: "tapa", name: "Extra Beef Tapa", price: 65 },
  { id: "atchara", name: "Extra Atchara", price: 20 },
  { id: "water", name: "Bottled Water", price: 25 },
  { id: "tea", name: "Iced Tea", price: 45 },
  { id: "soda", name: "Soft Drinks", price: 40 },
];

export const pesos = (value: number) => `₱${value.toLocaleString("en-PH")}`;
