import React, { useState, useEffect } from "react";
// import axios from "axios";

import PriceListRow from "./PriceListRow";

// function getCostBySize(products) {
//   let newProducts = [];

//   products.forEach((product) => {
//     //console.log(product);
//     const { tire_size, manufacturers } = product;

//     const manKeyes = Object.keys(manufacturers);
//     let newProduct = [];
//     newProduct["tire_size"] = tire_size;
//     newProduct["id"] = tire_size.replace(/\W/g, "_");
//     newProduct["cost_by_manufacturers"] = [];

//     manKeyes.forEach((key, index) => {
//       if (!manufacturers[key].hasOwnProperty("cost")) {
//         manufacturers[key].cost = 0;
//       }
//       newProduct["cost_by_manufacturers"].push({
//         name: key,
//         cost: manufacturers[key].cost,
//       });
//       //console.log(key, manufacturers[key], tire_size);
//     });
//     newProducts.push(newProduct);
//   });

//   console.log("newProducts:", newProducts);
//   return newProducts;
// }

const Body = ({ products }) => {
  //   const [costsByTireSize, setCostsByTireSize] = useState();
  //   const [changes, setChanges] = useState("Save Changes");

  //   const url = `${appLocalizer.apiUrl}/mpl/v1/settings`;

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setLoader("Saving...");
  //     axios
  //       .post(
  //         url,
  //         {
  //           firstname: firstname,
  //           lastname: lastname,
  //           email: email,
  //         },
  //         {
  //           headers: {
  //             "content-type": "application/json",
  //             "X-WP-NONCE": appLocalizer.nonce,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setLoader("Save Settings");
  //       });
  //   };

  //   useEffect(() => {
  //     axios.get(url).then((res) => {
  //       // setFirstName( res.data.firstname );
  //       // setLastName( res.data.lastname );
  //       // setEmail( res.data.email );
  //       console.log("res", res);

  //       if (res.data.products == false) {
  //         console.log("empty products");

  //         const product_to_send_wp = JSON.stringify(products);

  //         axios
  //           .post(
  //             url,
  //             {
  //               products: product_to_send_wp,
  //             },
  //             {
  //               headers: {
  //                 "content-type": "application/json",
  //                 "X-WP-NONCE": appLocalizer.nonce,
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             //setLoader("Save Settings");
  //             console.log("settigs updated!", res);
  //           });
  //       } else {
  //         let testProducts = JSON.parse(res.data.products);
  //         console.log("testProducts", testProducts);
  //       }
  //     });
  //   }, []);

  //   const products = appLocalizer.products;
  //   //console.log(products);

  //   const costBySize = getCostBySize(products);

  //   console.log("CP", costBySize);

  //12/R22.5

  //const test = costBySize.filter((item) => item.tire_size == "255/70R22.5");

  //console.log("test", test);

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
