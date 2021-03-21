import { AppThunk } from '../../App';
import { CartItemMap } from '../../models/cart-item';
import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

interface AddOrderAction {
  type: typeof ADD_ORDER;
  orderData: {
    id: string;
    items: CartItemMap[];
    amount: number;
    date: Date;
  };
}

interface SetOrderAction {
  type: typeof SET_ORDER;
  orders: Array<Order>;
}

export type OrderActionType = AddOrderAction | SetOrderAction;

export const fetchOrder = (): AppThunk<void> => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://the-shop-app-a940e-default-rtdb.firebaseio.com/orders/${userId}.json`
      );
      if (!response.ok) {
        throw new Error('Fetch order failed');
      }
      const resData = await response.json();

      const loadedOrders = [];
      console.log(resData);
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDER,
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems: CartItemMap[], totalAmount: number): AppThunk => {
  return async (dispatch, getState) => {
    const dateCreated = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://the-shop-app-a940e-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: dateCreated.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Add order failed');
    }
    const resData = await response.json();
    dispatch({
      id: resData.name,
      type: ADD_ORDER,
      orderData: { items: cartItems, amount: totalAmount, date: dateCreated },
    });
  };
};
