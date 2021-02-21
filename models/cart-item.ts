class CartItemModel {
  quantity: number;
  productPrice: number;
  productTitle: string;
  sum: number;
  constructor(quantity, productPrice, productTitle, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItemModel