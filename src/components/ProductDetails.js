import React from "react";
import parse from "html-react-parser";

export default function ProductDetails({ product }) {
  //console.log(product);
  return (
    <React.Fragment>
      <div className="product-detail-container">

        <div className="pdetail-row first">
          <div className="pdetail-item product-name">
            <div className="label">Product Name</div>
            <div className="value product-link">
              {parse(
                  product.produt_name.replace(
                    "<br>Free On-Site Mobile Installation",
                    ""
                  )
                )}
            </div>
          </div>
          <div className="pdetail-item profit">
            <div className="label">Profit</div>
            <div className="item-content profit value">
              {product.cost != 0 ?  Math.round(product.profit.toFixed(2)) : "--"}
            </div>
          </div>
        </div>

        <div className="pdetail-row secound">
          <div className="item t-cost">
            <div className="label">TiCost</div>
            <div className="value">
              {product.cost != 0 ? Math.round( product.cost ) : "--"}
            </div>
          </div>
          <div className="item installation">
            <div className="label">IF</div>
            <div className="value">
              {product.cost != 0 ? Math.round( product.if.toFixed(2) ) : "--"}
            </div>
          </div>
          <div className="item cc">
            <div className="label">CC</div>
            <div className="value">
              {product.cost != 0 ? Math.round( product.cc.toFixed(2) ) : "--"}
            </div>
          </div>
          <div className="item total-cost">
            <div className="label">ToCost</div>
            <div className="value">
              {product.cost != 0 ? Math.round( product.total_cost.toFixed(2) ) : "--"}
            </div>
          </div>
          <div className="item product-price">
            <div className="label">SellPrice</div>
            <div className="value last-item">{ Math.round(product.price)}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
