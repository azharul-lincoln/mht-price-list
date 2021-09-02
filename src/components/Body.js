import React from "react";
import PriceListRow from "./PriceListRow";

function setCostBySize(products) {
  console.log("products", products);

  let costBySize = [];

  products.forEach((product) => {
    let item = [];
    item["tire_size"] = product.tire_size;
    item["manufacturers"] = [];
    item["manufacturers_key"] = Object.keys(product.manufacturers);

    item.manufacturers_key.forEach((manufacturer) => {
      item["manufacturers"].push((item["manufacturers"][manufacturer] = 0));
    });
    console.log(item);

    // if (product.manufacturers) {
    //   product.manufacturers.forEach(function(manufacturer, index) {
    //     console.log("manufacturer", manufacturer, index);
    //   });
    // }
  });
}

const Body = () => {
  const products = appLocalizer.products;
  //console.log(products);

  const costBySize = setCostBySize(products);

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
