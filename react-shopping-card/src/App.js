import React from "react";
import data from"./data.json";
import Products from "./components/Products";

 class App extends React.Component {
   constructor(props){
     super(props);
     this.state={
       products: data.products,
       Size:"",
       sort:"",
     }
     
   }
   
  render(){
  return (
    <div className="wrapper">
    <header>
      <a href="/">React shopping Card</a>
    </header>
    <main>
    <div className="content">
      <div className="main">
        <Products products={this.state.products} ></Products>
      </div>
      <div className="sidebar">Cart Item</div>
    </div>
    </main>
    <footer>All Right is reserved</footer>
</div>
  );
  }
}

export default App;
