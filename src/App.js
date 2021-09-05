import React, { useState, useEffect } from "react";
import Skeleton from "@yisheng90/react-loading";
import axios from "axios";

import { Header } from "./components/Header/Header";
import Body from "./components/Body";
import HeaderTop from "./components/Header/HeaderTop";

function getCostBySize(products) {
  let newProducts = [];

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
    newProducts.push(newProduct);
  });

  console.log("newProducts:", newProducts);
  return newProducts;
}

function App() {
  const [costsByTireSize, setCostsByTireSize] = useState();
  const [changes, setChanges] = useState("Save Changes");

  const url = `${appLocalizer.apiUrl}/mpl/v1/settings`;

  useEffect(() => {
    axios.get(url).then((res) => {
      // setFirstName( res.data.firstname );
      // setLastName( res.data.lastname );
      // setEmail( res.data.email );
      console.log("res", res);

      if (res.data.products == false) {
        console.log("empty products");

        const product_to_send_wp = JSON.stringify(products);

        axios
          .post(
            url,
            {
              products: product_to_send_wp,
            },
            {
              headers: {
                "content-type": "application/json",
                "X-WP-NONCE": appLocalizer.nonce,
              },
            }
          )
          .then((res) => {
            //setLoader("Save Settings");
            console.log("settigs updated!", res);
          });
      } else {
        let testProducts = JSON.parse(res.data.products);
        console.log("testProducts", testProducts);
      }
    });
  }, []);

  const products = appLocalizer.products;
  //console.log(products);

  const costBySize = getCostBySize(products);

  console.log("CP", costBySize);

  return (
    <React.Fragment>
      <HeaderTop />
      <div className="mht-price-list">
        <Header />
        <Body products={products} />
      </div>
    </React.Fragment>

    // <React.Fragment>
    //   <div style={{ fontSize: "22px", margin: "20px 0" }}>Loading...</div>
    //   <Skeleton width={"100%"} height={60} rows={20} color={"#ddd"} />
    // </React.Fragment>
  );
}
export default App;
