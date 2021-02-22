import Order from "../../models/order";
import { ADD_ORDER, OrderActonType } from "../actions/orders";

const initialState = {
  orders: []
}

export default (state = initialState, action: OrderActonType): typeof initialState => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(new Date().toString(), action.orderData.items, action.orderData.amount, new Date());
      return { ...state, orders: state.orders.concat(newOrder) }
  }
  return state;
};