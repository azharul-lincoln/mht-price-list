import React from "react";
import parse from "html-react-parser";

export default function ProductDetails({ product }) {
  return (
    <React.Fragment>
      <div className="product-detail-container">
        <div className="product-name product-grid-item">
          {parse(product.produt_name)}
        </div>

        <div className="product-detail product-grid-item">
          <div className="product-detail-item">
            <div className="item-lavel">
              <p>Total Tire Cost: </p>
            </div>
            <div className="item-amount">
              <p>$454</p>
            </div>
          </div>

          <div className="product-detail-item">
            <div className="item-lavel">
              <p>Installation: </p>
            </div>
            <div className="item-amount">
              <p>$333</p>
            </div>
          </div>

          <div className="product-detail-item">
            <div className="item-lavel">
              <p>Freight:</p>
            </div>
            <div className="item-amount">
              <p>$250</p>
            </div>
          </div>
        </div>

        <div className="product-detail product-grid-item">
          <div className="product-detail-item">
            <div className="item-lavel">
              <p>Web Price:</p>
            </div>
            <div className="item-amount">
              <p>{product.price}</p>
            </div>
          </div>

          <div className="product-detail-item">
            <div className="item-lavel">
              <p>Total Cost:</p>
            </div>
            <div className="item-amount">
              <p>$3456</p>
            </div>
          </div>

          <div className="product-detail-item profit">
            <div className="item-lavel">
              <p>Profit:</p>
            </div>
            <div className="item-amount">
              <p>$500</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
