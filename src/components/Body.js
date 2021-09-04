import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [ppp, setPpp] = useState("");
  const [changes, setChanges] = useState("Save Changes");

  const url = `${appLocalizer.apiUrl}/mpl/v1/settings`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader("Saving...");
    axios
      .post(
        url,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": appLocalizer.nonce,
          },
        }
      )
      .then((res) => {
        setLoader("Save Settings");
      });
  };

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
