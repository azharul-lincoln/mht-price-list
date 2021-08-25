import React from "react";
import { SetItems } from "./SetItems";

const BrandItem = ({ item }) => {
  console.log(item);

  if (!("2_tire_set" in item)) {
    item["2_tire_set"] = [];
  }

  if (!("4_tire_set" in item)) {
    item["4_tire_set"] = [];
  }

  if (!("6_tire_set" in item)) {
    item["6_tire_set"] = [];
  }

  if (!("8_tire_set" in item)) {
    item["8_tire_set"] = [];
  }

  return (
    <div className="brand-item">
      <div className="tire-manufacturer tire-set-item">
        <h3>{item.name}</h3>
      </div>
      <SetItems setNumber="2_tire_set" items={item["2_tire_set"]} />
      <SetItems setNumber="4_tire_set" items={item["4_tire_set"]} />
      <SetItems setNumber="6_tire_set" items={item["6_tire_set"]} />
      <SetItems setNumber="8_tire_set" items={item["8_tire_set"]} />

      {/* {Object.entries(item).map(([key, nthSetItem]) => {
        // Pretty straightforward - use key for the key and value for the value.
        // Just to clarify: unlike object destructuring, the parameter names don't matter here.
        //console.log(value);
        if (key !== "name") {
          return <SetItems setNumber={key} setItems={nthSetItem} />;
        }
      })} */}
    </div>
  );
};

export default BrandItem;
