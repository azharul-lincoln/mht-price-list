import React from "react";
import parse from "html-react-parser";

export default function ProductDetails({ product }) {
  return (
    <div className="product-detail-container">
      <div className="product-name">{parse(product.produt_name)}</div>
      <div className="product-price">{product.price}</div>
      <div className="product-quentatty">{product.qty}</div>
    </div>
  );
}
