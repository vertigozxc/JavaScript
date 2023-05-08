import React, { Component } from 'react';

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  get total() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addProduct(product, quantity = 1) {
    const existingItem = this.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = new CartItem(product, quantity);
      this.items.push(newItem);
    }
  }

  removeProduct(product) {
    const existingItemIndex = this.items.findIndex((item) => item.product.id === product.id);
    if (existingItemIndex !== -1) {
      this.items.splice(existingItemIndex, 1);
    }
  }

  get total() {
    return this.items.reduce((total, item) => total + item.total, 0);
  }
}

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: new ShoppingCart(),
    };
  }

  handleAddProduct = (product) => {
    const { cart } = this.state;
    cart.addProduct(product);
    this.setState({ cart });
  };

  handleRemoveProduct = (product) => {
    const { cart } = this.state;
    cart.removeProduct(product);
    this.setState({ cart });
  };

  render() {
    const { cart } = this.state;

    return (
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {cart.items.map((item) => (
            <li key={item.product.id}>
              {item.product.name} x {item.quantity} = ${item.total.toFixed(2)}
              <button onClick={() => this.handleRemoveProduct(item.product)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${cart.total.toFixed(2)}</p>
      </div>
    );
  }
}

export default Cart;
