import React, { Component } from "react";
import formatCurrency from "../util";
export default class Cart extends Component {
  state = {
    showCheckout: false,
    name:"",
    email:"",
    address:""
  };
  handlInput =(e)=>{
    this.setState({[e.target.name]:e.target.value})
  } 
  createOrder=(e)=>{
    e.preventDefault();
    const order = {
      name: this.state.name,
      email:this.state.email,
      address:this.state.address,
      cartItem: this.props.cartItem,
    };
    this.props.createOrder(order);
  }; 
  render() {
    const { cartItems } = this.props;

    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">cart is empty</div>
        ) : (
          <div className="cart cart-header">
            you have {cartItems.length} in this cart{" "}
          </div>
        )}

        <div>
          <div className="card">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button onClick={() => this.props.removeFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  onClick={() => {
                    this.setState({ showCheckout: true });
                  }}
                  className="button primary"
                >
                  Process
                </button>
              </div>
            </div>
            
            {this.state.showCheckout && (
              <div className="cart">
                <form onSubmit={this.createOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input 
                    type="email"
                    name="email"
                    required 
                    onChange={this.handlInput}>
                    </input>
                  </li>
                  <li>
                    <label>Name</label>
                    <input 
                    type="text"
                    name="name"
                    required 
                    onChange={this.handlInput}>
                    </input>
                  </li>
                  <li>
                    <label>Address</label>
                    <input 
                    type="text"
                    name="address"
                    required 
                    onChange={this.handlInput}>
                    </input>
                  </li>
                  <li>
                    <button className="button primary" type="submit">Checkout</button>
                  </li>
                </ul>

                </form>
              </div>
            )} 
           </div>
          )}
        </div>
      </div>
    );
  }
}
