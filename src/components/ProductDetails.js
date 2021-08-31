import React from "react";
import parse from "html-react-parser";

export default function ProductDetails({ product }) {
  return (
    <React.Fragment>
      <div className="product-detail-container">
        <div className="product-name">{parse(product.produt_name)}</div>
        <div className="tire-cost">
          Tire <br />
          Cost
        </div>
        <div className="installation">
          Installation <br /> Freight
        </div>
        <div className="cc">
          Credit <br />
          Card
        </div>
        <div className="total-cost">
          TOtal
          <br />
          Cost
        </div>
        <div className="product-price">
          Selling
          <br />
          Price
        </div>
        <div className="profit">
          Gross
          <br />
          Profit
        </div>
      </div>
    </React.Fragment>
  );
}
