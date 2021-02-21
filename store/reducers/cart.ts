import CartItemModel from "../../models/cart-item";
import { AddToCartAction, ADD_TO_CART } from "../actions/cart";


const initialState = {
  items: new Map<string, CartItemModel>(),
  totalAmount: 0,
};

export default (state = initialState, action: AddToCartAction) => {
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
  }
  return state;
};