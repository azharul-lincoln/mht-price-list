import React, { useContext } from "react";
import { ProductContext } from "../App";
// import axios from "axios";
import PriceListRow from "./PriceListRow";

// const arbitary = [...costByManufacsTireSize, { aonter: "adfsd", value: 45 }];
// setCostByManufacsTireSize(arbitary);

// console.log("costByManufacsTireSize Manu", costByManufacsTireSize);
function Body() {
  const { products, setProducts } = useContext(ProductContext);

  // console.log("costByManufacsTireSize body", costByManufacsTireSize);
  // console.log("Products body", products);

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
}

export default Body;
