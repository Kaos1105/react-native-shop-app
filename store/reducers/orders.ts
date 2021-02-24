import Order from '../../models/order';
import { ADD_ORDER, OrderActonType } from '../actions/orders';

const initialState = {
  items: new Map<string, Order>(),
};

export default (state = initialState, action: OrderActonType): typeof initialState => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return { ...state, items: state.items.set(newOrder.id, newOrder) };
  }
  return state;
};
