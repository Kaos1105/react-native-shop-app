interface IProduct {
  id: string,
  ownerId: string,
  title: string,
  imageUrl: string,
  description: string,
  price: number;
}

class Product implements IProduct {
  constructor(id, ownerId, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export default Product;