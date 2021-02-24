import Product from '../../models/product';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOTE_FROM_CART = 'REMOTE_FROM_CART';

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  product: Product;
}
interface RemoveFromCartAction {
  type: typeof REMOTE_FROM_CART;
  productId: string;
}

export type CartActionType = AddToCartAction | RemoveFromCartAction;
export const addToCart = (product): AddToCartAction => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = (productId: string): RemoveFromCartAction => {
  return { type: REMOTE_FROM_CART, productId: productId };
};
