import { CartItemMap } from './cart-item';
import { format } from 'date-fns';

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

  get readableDate() {
    return format(this.date, 'dd/MM/yyyy HH:mm');
  }
}
export default Order;
