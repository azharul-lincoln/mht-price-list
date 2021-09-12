import React, { useState, useEffect } from "react";
import axios from "axios";
//import create from "zustand";

// import { useMplStore } from "./components/Store/useMplStore";
import { Header } from "./components/Header/Header";
import Body from "./components/Body";
import HeaderTop from "./components/Header/HeaderTop";
import Loader from "./components/Loading/Loader";

// const CostByManufacsTireSizeContext = React.createContext();
const ProductContext = React.createContext();
const GlobalCostingContext = React.createContext();
const UpdateAppDataContext = React.createContext();

// function getCostBySizeFromWpProducts(products) {
//   let costBySizeFromWpProducts = [];

//   products.forEach((product) => {
//     //console.log(product);
//     const { tire_size, manufacturers } = product;

//     const manKeyes = Object.keys(manufacturers);

//     let newProduct = {};
//     newProduct.id = tire_size.replace(/\W/g, "_");
//     newProduct.tire_size = tire_size;
//     newProduct.cost_by_manufacturers = [];

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
//     costBySizeFromWpProducts.push(newProduct);
//   });

//   //console.log("newProducts:", costBySizeFromWpProducts);
//   return costBySizeFromWpProducts;
// }

function App() {
  console.log(appLocalizer.products);
  const [products, setProducts] = useState(appLocalizer.products);
  const [globalCosting, setGlobalCosting] = useState(undefined);
  const [updateAppData, setUpdateAppData] = useState(false);

  const defaultGlobalCosting = {
    twoTireSet: {
      ic: 300,
      fc: 150,
      cc: 2.5,
    },
    fourTireSet: {
      ic: 450,
      fc: 200,
      cc: 2.5,
    },
    sixTireSet: {
      ic: 650,
      fc: 250,
      cc: 2.5,
    },
    eightTireSet: {
      ic: 800,
      fc: 350,
      cc: 2.5,
    },
  };

  const url = `${appLocalizer.apiUrl}/mpl/v1/settings`;

  const getGlobalCostingFromServer = async () => {
    axios.get(url).then((res) => {
      if (res.data.global_costing == false) {
        const initilaiseGlobalCosting = JSON.stringify(defaultGlobalCosting);
        axios
          .post(
            url,
            {
              global_costing_asumption: initilaiseGlobalCosting,
            },
            {
              headers: {
                "content-type": "application/json",
                "X-WP-NONCE": appLocalizer.nonce,
              },
            }
          )
          .then((res) => {
            if (res.data == "success") {
              axios.get(url).then((serverResponse) => {
                console.log(serverResponse);
                const processJsondata = JSON.parse(
                  serverResponse.data.global_costing
                );
                console.log(`processJsondataGC`, processJsondata);
                setGlobalCosting(processJsondata);
                //return processJsondata;
              });
            }
          });
      } else {
        setGlobalCosting(JSON.parse(res.data.global_costing));
      }
    });
  };

  // const calculateCostByManufacsTireSize = async (products) => {
  //   axios.get(url).then((res) => {
  //     console.log("res", res);
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
  //           if (res.data == "success") {
  //             axios.get(url).then((serverResponse) => {
  //               console.log(serverResponse);
  //               const processJsondata = JSON.parse(
  //                 serverResponse.data.cost_by_manufacs_tire_size
  //               );
  //               console.log(`processJsondata`, processJsondata);
  //               setCostByManufacsTireSize(processJsondata);
  //               //return processJsondata;
  //             });
  //           }
  //         });
  //     } else {
  //       console.log(`data was already there!`);
  //       //return JSON.parse(res.data.cost_by_manufacs_tire_size);
  //       setCostByManufacsTireSize(
  //         JSON.parse(res.data.cost_by_manufacs_tire_size)
  //       );
  //     }
  //   });
  // };

  useEffect(() => {
    //calculateCostByManufacsTireSize(products);
    getGlobalCostingFromServer();
  }, []);

  if (globalCosting !== undefined) {
    return (
      <GlobalCostingContext.Provider
        value={{ globalCosting, setGlobalCosting }}
      >
        <ProductContext.Provider value={{ products, setProducts }}>
          <UpdateAppDataContext.Provider
            value={{ updateAppData, setUpdateAppData }}
          >
            <React.Fragment>
              <HeaderTop url={url} />
              <div className="mht-price-list">
                <Header />
                <Body />
              </div>
            </React.Fragment>
          </UpdateAppDataContext.Provider>
        </ProductContext.Provider>
      </GlobalCostingContext.Provider>
    );
  }

  return <Loader />;
}
export default App;
export { ProductContext, GlobalCostingContext, UpdateAppDataContext };
