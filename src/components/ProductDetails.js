import React from "react";
import parse from "html-react-parser";

export default function ProductDetails({ product }) {
  return (
    <React.Fragment>
      <div className="product-detail-container">
        <div className="product-name">Total Tire Cost</div>
        <div className="product-price">Installation</div>
        <div className="product-quentatty">Freight</div>
        <div className="product-quentatty">CC Charge</div>
      </div>

      <div className="product-detail-container">
        <div className="product-name">$888</div>
        <div className="product-price">$333</div>
        <div className="product-quentatty">$250</div>
        <div className="product-quentatty">$60</div>
      </div>

      <div className="product-detail-container">
        <div className="product-name">{parse(product.produt_name)}</div>
        <div className="product-price">{product.price}</div>
        <div className="product-quentatty">{product.qty}</div>
        <div className="product-quentatty">$60</div>
      </div>
    </React.Fragment>
  );
}
