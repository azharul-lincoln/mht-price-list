import React from "react";
import create from "zustand";
import axios from "axios";

const url = `${appLocalizer.apiUrl}/mpl/v1/settings`;

function getCostBySizeFromWpProducts(products) {
  let costBySizeFromWpProducts = [];

  products.forEach((product) => {
    //console.log(product);
    const { tire_size, manufacturers } = product;

    const manKeyes = Object.keys(manufacturers);
    let newProduct = [];
    newProduct["tire_size"] = tire_size;
    newProduct["id"] = tire_size.replace(/\W/g, "_");
    newProduct["cost_by_manufacturers"] = [];

    manKeyes.forEach((key, index) => {
      if (!manufacturers[key].hasOwnProperty("cost")) {
        manufacturers[key].cost = 0;
      }
      newProduct["cost_by_manufacturers"].push({
        name: key,
        cost: manufacturers[key].cost,
      });
      //console.log(key, manufacturers[key], tire_size);
    });
    costBySizeFromWpProducts.push(newProduct);
  });

  //console.log("newProducts:", costBySizeFromWpProducts);
  return costBySizeFromWpProducts;
}

const useMplStore = create((set) => ({
  products: appLocalizer.products,
  //costByManufacsTireSize: undefined,
  // setCostByManufacsTireSize: async () => {
  //   axios.get(url).then((res) => {
  //     // console.log("res", res);
  //     if (res.data.cost_by_manufacs_tire_size == false) {
  //       console.log("empty products");

  //       const product_to_send_wp = JSON.stringify(
  //         getCostBySizeFromWpProducts(products)
  //       );
  //       axios
  //         .post(
  //           url,
  //           {
  //             cost_by_manufacs_tire_size: product_to_send_wp,
  //           },
  //           {
  //             headers: {
  //               "content-type": "application/json",
  //               "X-WP-NONCE": appLocalizer.nonce,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           //setLoader("Save Settings");
  //           console.log("settigs updated!", res);

  //           set({
  //             costByManufacsTireSize: JSON.parse(
  //               res.data.cost_by_manufacs_tire_size
  //             ),
  //           });
  //         });
  //     } else {
  //       set({ costByManufacsTireSize: JSON.parse(res.data.products) });
  //     }
  //   });
  // },

  //   increasePopulation: () => set((state) => ({ products: state.products + 1 })),
  //   removeAllBears: () => set({ products: 0 }),
}));

export default useMplStore;
