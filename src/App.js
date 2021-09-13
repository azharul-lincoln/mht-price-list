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
