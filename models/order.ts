import CartItemModel, { CartItemMap } from "./cart-item";

class Order {
  id: string;
  item: CartItemMap[];
  totalAmount: number;
  date: Date;
  constructor(id: string, items: CartItemMap[], totalAmount: number, date: Date) {
    this.id = id;
    this.item = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}
export default Order;