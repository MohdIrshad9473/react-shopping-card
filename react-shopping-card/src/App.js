import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [...data.products],
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
      initial: [...data.products],
    };
  }
  componentDidMount() {
    this.initialState = this.state;
  }
  createOrder = (order) => {
    alert("need to save the order for " + order.name);
  };
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id != product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(this.state.cartItems.filter((x) => x._id != product._id))
    );
  };
  addToCart = (product) => {
    // check if item is already in aarray  cartItem
    let allItems = this.state.cartItems;
    //  [obj1, obj2,...]  obj2
    let item_found_in_array = false;
    allItems.map((e) => {
      if (e._id == product._id) {
        e.count = e.count + 1;
        item_found_in_array = true; // jab product already in array
        this.setState({ cartItems: allItems }, () => {
          localStorage.setItem(
            "cartItems",
            JSON.stringify(this.state.cartItems)
          );
        });
      }
    });
    if (!item_found_in_array) {
      product["count"] = 1;
      this.setState({ cartItems: [...this.state.cartItems, product] }, () => {
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
      });
    }

    // else {
    //   this.setState({ cartItems: allItems },
    //     // localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems))
    //     );

    // }
  };

  shortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState({
      sort: sort,
    });

    if (sort === "lowest") {
      this.state.products.sort((a, b) => {
        return parseInt(a.price) - parseInt(b.price);
      });
      this.setState({
        products: this.state.products,
      });
    } else {
      if (sort === "highest") {
        this.state.products.sort((a, b) => {
          return parseInt(b.price) - parseInt(a.price);
        });

        this.setState({
          products: this.state.products,
        });
      }
      if (sort === "latest") {
        this.setState(
          {
            products: [...this.state.initial], // THIS IS WAY TO COPY COMPLETE ARRY NOW IT IS NEW ARRAY
          },
          () => console.log("latest", this.state.products)
        );

        //PROBLEM WAS.. YOU ARE ASSIGNING ARRAY...AND IT DONT ASSIGN COMPLETLY BUT ONLY ADDRSS. SO BOTH POINT SAME ARRAY
      }
    }
  };
  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availabelSize.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    console.log(localStorage.getItem("cartItems"));
    return (
      <div className="wrapper">
        <header>
          <a href="/">React shopping Card</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                shortProducts={this.shortProducts}
                filterProducts={this.filterProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All Right is reserved</footer>
      </div>
    );
  }
}

export default App;
