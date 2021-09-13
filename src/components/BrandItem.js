import React, { useContext } from "react";
import { SetItems } from "./SetItems";
import { ProductContext, UpdateAppDataContext } from "../App";

const BrandItem = ({ item, manufacturerKey, tireSize }) => {
  const { products, setProducts } = useContext(ProductContext);
  const { updateAppData, setUpdateAppData } = useContext(UpdateAppDataContext);

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

  // console.log(`tireSize`, tireSize);
  // console.log(`manufacturerKey`, manufacturerKey);
  // console.log(`item`, item);

  const handleCostChange = (event) => {
    let newProducts = products.map((product) => {
      if (tireSize == product.tire_size) {
        //console.log(product["manufacturers"][manufacturerKey]);
        product["manufacturers"][manufacturerKey]["base_cost"] =
          event.target.value;

        if (
          product["manufacturers"][manufacturerKey]["2_tire_set"].length != 0
        ) {
          product["manufacturers"][manufacturerKey]["2_tire_set"].map(
            (item) => {
              item.cost = event.target.value * 2;
              item.cc = (2.5 / 100) * (item.cost + item.if);
              item.total_cost = item.cost + item.cc + item.if;
              item.profit = parseInt(item.price) - item.total_cost;
            }
          );
        }

        if (
          product["manufacturers"][manufacturerKey]["4_tire_set"].length != 0
        ) {
          product["manufacturers"][manufacturerKey]["4_tire_set"].map(
            (item) => {
              item.cost = event.target.value * 4;
              item.cc = (2.5 / 100) * (item.cost + item.if);
              item.total_cost = item.cost + item.cc + item.if;
              item.profit = parseInt(item.price) - item.total_cost;
            }
          );
        }

        if (
          product["manufacturers"][manufacturerKey]["6_tire_set"].length != 0
        ) {
          product["manufacturers"][manufacturerKey]["6_tire_set"].map(
            (item) => {
              item.cost = event.target.value * 6;
              item.cc = (2.5 / 100) * (item.cost + item.if);
              item.total_cost = item.cost + item.cc + item.if;
              item.profit = parseInt(item.price) - item.total_cost;
            }
          );
        }

        if (
          product["manufacturers"][manufacturerKey]["8_tire_set"].length != 0
        ) {
          product["manufacturers"][manufacturerKey]["8_tire_set"].map(
            (item) => {
              item.cost = event.target.value * 8;
              item.cc = (2.5 / 100) * (item.cost + item.if);
              item.total_cost = item.cost + item.cc + item.if;
              item.profit = parseInt(item.price) - item.total_cost;
            }
          );
        }
      }
      return product;
    });

    setProducts(newProducts);
    setUpdateAppData(true);
  };

  return (
    <div className="brand-item">
      <div className="tire-manufacturer tire-set-item">
        <h3>{item.name}</h3>
      </div>

      <div className="tire-cost tire-set-item">
        <div className="cost-input-container">
          <span className="dolar">$</span>
          <input
            type="number"
            value={item.base_cost}
            onChange={handleCostChange}
          />
        </div>
      </div>

      <SetItems setNumber="2_tire_set" items={item["2_tire_set"]} />
      <SetItems setNumber="4_tire_set" items={item["4_tire_set"]} />
      <SetItems setNumber="6_tire_set" items={item["6_tire_set"]} />
      <SetItems setNumber="8_tire_set" items={item["8_tire_set"]} />
    </div>
  );
};

export default BrandItem;
