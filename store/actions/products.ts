import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  productId: string;
}

interface CreateProductAction {
  type: typeof CREATE_PRODUCT;
  productData: {
    title;
    description;
    imageUrl;
    price;
  };
}

interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  pid: string;
  productData: {
    title;
    description;
    imageUrl;
  };
}

export type ProductActionType = DeleteProductAction | CreateProductAction | UpdateProductAction;

export const deleteProduct = (productId: string): DeleteProductAction => {
  return { type: DELETE_PRODUCT, productId: productId };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
): CreateProductAction => {
  return { type: CREATE_PRODUCT, productData: { title, description, imageUrl, price } };
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
): UpdateProductAction => {
  return { type: UPDATE_PRODUCT, pid: id, productData: { title, description, imageUrl } };
};
