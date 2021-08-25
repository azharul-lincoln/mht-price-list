import React from "react";
import PriceListRow from "./PriceListRow";

const Body = () => {
  const products = appLocalizer.products;
  console.log(products);
  return (
    <React.Fragment>
      {products.map((product) => (
        <PriceListRow
          tireSize={product.tire_size}
          manufacturers={product.manufacturers}
        />
      ))}
    </React.Fragment>
  );
};

export default Body;
