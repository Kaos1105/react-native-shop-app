import Order from '../../models/order';
import { ADD_ORDER, OrderActionType, SET_ORDER } from '../actions/orders';

const initialState = {
  items: new Map<string, Order>(),
};

export default (state = initialState, action: OrderActionType): typeof initialState => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return { ...state, items: state.items.set(newOrder.id, newOrder) };
    case SET_ORDER:
      let updatedOrders = new Map(state.items);
      action.orders.forEach((order) => {
        updatedOrders.set(order.id, order);
      });
      return {
        ...state,
        items: updatedOrders,
      };
  }
  return state;
};
