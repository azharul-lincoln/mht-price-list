import React from "react";

function HeaderDetail() {
  return (
    <div className="product-detail-container pdetail-headings">
      <div className="product-name">Product name</div>
      <div className="t-cost">
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
  );
}

export default HeaderDetail;
