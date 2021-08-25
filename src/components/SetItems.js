import React from "react";
import ProductDetails from "./ProductDetails";

export const SetItems = ({ setNumber, items }) => {
  //console.log(setNumber, typeof setItems, setItems);
  //   console.log(`setItems`, setItems);
  //   console.log(`setNumber`, setNumber);

  const tireSetItemClass = `tire-set-item ${setNumber}`;

  if (items.length == 0) {
    return (
      <div className={tireSetItemClass}>
        <div className="product-detail-container"></div>
      </div>
    );
  }

  return (
    <div className={tireSetItemClass}>
      {Object.entries(items).map(([key, productDetail]) => {
        // Pretty straightforward - use key for the key and value for the value.
        // Just to clarify: unlike object destructuring, the parameter names don't matter here.
        //console.log(value);
        return <ProductDetails product={productDetail} />;
      })}
    </div>
  );
};
