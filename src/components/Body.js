import React from "react";
import PriceListRow from "./PriceListRow";

const Body = () => {
  const products = appLocalizer.products;
  console.log(products);
  return (
    <React.Fragment>
      {products.map((product) => (
        <div className="mht-plist-row">
          <div className="tire-size plist-row-item">
            <h3>{product.tire_size}</h3>
            {product.manufacturers.map((man) => console.log(man))}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Body;
