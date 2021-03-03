import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  productId: string;
}

export type ProductActionType = DeleteProductAction;

export const deleteProduct = (productId: string): DeleteProductAction => {
  return { type: DELETE_PRODUCT, productId: productId };
};
