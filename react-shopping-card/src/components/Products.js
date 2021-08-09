import React, { Component } from 'react'
import formatCurrency from "../util"
export default class Products extends Component {
   
   
    
    render() {
        return (
            <div>
                <ul className="products">
                
                     {  
                         
                         this.props.products.map(e => (
                         <li key={e._id}>
                         <div className="product">
                             <a href={"#" + e._id}>
                             
                                <img src={e.image} alt={e.title}></img>
                                <p>
                                 {e.title}
                             </p>
                             </a>
                             <div className="product-price">
                                 <div>{formatCurrency(e.price)} </div>
                                 <button onClick={()=>this.props.addToCart(e)} className="button primary">Add To Card</button>
                             </div>
                             
                         </div>
                         </li>
                         
                     ))}
                </ul>
            </div>
        )
    }
}

