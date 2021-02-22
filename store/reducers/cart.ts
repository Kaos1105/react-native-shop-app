import CartItemModel from "../../models/cart-item";
import { ADD_TO_CART, REMOTE_FROM_CART, CartActionType } from "../actions/cart";

// interface ReturnState {
//   items: Map<string, CartItemModel>,
//   totalAmount: number
// }

const initialState = {
  items: new Map<string, CartItemModel>(),
  totalAmount: 0,
};

export default (state = initialState, action: CartActionType): typeof initialState => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const prodTitle = addedProduct.title

      let updatedOrNewCartItem;

      if (state.items.has(addedProduct.id)) {
        //already have item in the cart
        updatedOrNewCartItem = new CartItemModel(
          state.items.get(addedProduct.id).quantity + 1,
          productPrice,
          prodTitle,
          state.items.get(addedProduct.id).sum + productPrice);
      }
      else {
        updatedOrNewCartItem = new CartItemModel(1, productPrice, prodTitle, productPrice);
      }
      return {
        ...state, items: state.items.set(addedProduct.id, updatedOrNewCartItem),
        totalAmount: state.totalAmount + productPrice
      };

    case REMOTE_FROM_CART:
      const selectedCartItem = state.items.get(action.productId);
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems = state.items;
      if (currentQty > 1) {
        //reduce by one
        const updatedCartItem = new CartItemModel(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice);
        updatedCartItems.set(action.productId, updatedCartItem);
      } else {
        //erase 
        updatedCartItems.delete(action.productId);
      }
      return {
        ...state, items: updatedCartItems, totalAmount: state.totalAmount - selectedCartItem.productPrice
      }

  }
  return state;
};