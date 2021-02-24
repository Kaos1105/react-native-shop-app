import CartItemModel, { CartItemMap } from '../../models/cart-item';

export const ADD_ORDER = 'ADD_ORDER';

interface AddOrderAction {
  type: typeof ADD_ORDER;
  orderData: {
    items: CartItemMap[];
    amount: number;
  };
}

export type OrderActonType = AddOrderAction;

export const addOrder = (cartItems: CartItemMap[], totalAmount: number): AddOrderAction => {
  return { type: ADD_ORDER, orderData: { items: cartItems, amount: totalAmount } };
};
