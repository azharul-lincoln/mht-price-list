import React from "react";
import parse from "html-react-parser";

export default function ProductDetails({ product }) {
  //console.log(product);
  return (
    <React.Fragment>
      <div className="product-detail-container">
        <div className="product-name">
          {parse(
            product.produt_name.replace(
              "<br>Free On-Site Mobile Installation",
              ""
            )
          )}
        </div>
        <div className="t-cost">
          <div className="label">TiCost</div>
          <div className="value">
            {product.cost != 0 ? Math.round( product.cost ) : "--"}
          </div>
        </div>
        <div className="installation">
          <div className="label">IF</div>
          <div className="value">
            {product.cost != 0 ? Math.round( product.if.toFixed(2) ) : "--"}
          </div>
        </div>
        <div className="cc">
          <div className="label">CC</div>
          <div className="value">
            {product.cost != 0 ? Math.round( product.cc.toFixed(2) ) : "--"}
          </div>
        </div>
        <div className="total-cost">
          <div className="label">ToCost</div>
          <div className="value">
            {product.cost != 0 ? Math.round( product.total_cost.toFixed(2) ) : "--"}
          </div>
        </div>
        <div className="product-price">
          <div className="label">SellPrice</div>
          <div className="value">{ Math.round(product.price)}</div>
        </div>
        <div className="profit">
          <div className="label">Profit</div>
          <div className="value">
            {product.cost != 0 ?  Math.round(product.profit.toFixed(2)) : "--"}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
