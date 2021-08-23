import React from "react";
import { SetItems } from "./SetItems";

const BrandItem = ({ item }) => {
  console.log(item);
  return (
    <div className="brand-item">
      <div className="tire-manufacturer tire-set-item">
        <h3>{item.name}</h3>

        {Object.entries(item).map(([key, nthSetItem]) => {
          // Pretty straightforward - use key for the key and value for the value.
          // Just to clarify: unlike object destructuring, the parameter names don't matter here.
          //console.log(value);
          return <SetItems setNumber={key} setItems={nthSetItem} />;
        })}
      </div>
    </div>
  );
};

export default BrandItem;
