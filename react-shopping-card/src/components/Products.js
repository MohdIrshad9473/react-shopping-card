import React, { Component } from 'react'
import formatCurrency from "../util"
export default class Products extends Component {
    state ={
        Product: this.props.products
      
    }
   
    
    render() {
        return (
            <div>
                <ul className="products">
                
                     { 
                         this.state.Product.map(e => (
                         <li key={e._id}>
                         <div className="product">
                             <a href={"#" + e._id}>
                             
                                <img src={e.image} alt={e.title}></img>
                                <p>
                                 {e.title}
                             </p>
                             </a>
                             <div className="product-price">
                                 <div>{formatCurrency(e.price)}</div>
                                 {console.log(typeof formatCurrency(e.price))}
                                 <button className="button primary">Add To Card</button>
                             </div>
                             
                         </div>
                         </li>
                         
                     ))}
                </ul>
            </div>
        )
    }
}

