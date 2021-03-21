import { AppThunk } from '../../App';
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

interface SetProductAction {
  type: typeof SET_PRODUCT;
  products: Array<Product>;
  userProducts: Array<Product>;
}

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  productId: string;
}

interface CreateProductAction {
  type: typeof CREATE_PRODUCT;
  productData: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    ownerId: string;
  };
}

interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  pid: string;
  productData: {
    title: string;
    description: string;
    imageUrl: string;
  };
}

export type ProductActionType =
  | DeleteProductAction
  | CreateProductAction
  | UpdateProductAction
  | SetProductAction;

export const fetchProducts = (): AppThunk<void> => {
  return async (dispatch, getState) => {
    //async code to server
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://the-shop-app-a940e-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Response failed');
      }

      const resData = await response.json();

      const loadedProducts = new Array<Product>();
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      //show err
      throw err;
    }
  };
};

export const deleteProduct = (productId: string): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://the-shop-app-a940e-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Delete failed');
    }
    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
): AppThunk => {
  return async (dispatch, getState) => {
    //async code to server
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://the-shop-app-a940e-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();

    //console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: { id: resData.name, title, description, imageUrl, price, ownerId: userId },
    });
  };
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log(token);
    const response = await fetch(
      `https://the-shop-app-a940e-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    if (!response.ok) {
      throw new Error('Update failed');
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: { title, description, imageUrl },
    });
  };
};
