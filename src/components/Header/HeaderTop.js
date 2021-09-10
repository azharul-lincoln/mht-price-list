import React, { useContext } from "react";
import { ProductContext, UpdateAppDataContext } from "../../App";

import axios from "axios";

// import { ProductContext, UpdateAppDataContext } from "../Header/components/App";

export default function HeaderTop({ url }) {
  const { products, setProducts } = useContext(ProductContext);
  const { updateAppData, setUpdateAppData } = useContext(UpdateAppDataContext);
  console.log(updateAppData);

  const updateButtonText = updateAppData ? "SAVE CHANGES" : "SAVED";

  const updateProducts = async () => {
    //updateButtonText = "UPDATING...";
    console.log(products);
    axios
      .post(
        url,
        {
          mht_mpl_products: JSON.stringify(products),
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
          // axios.get(url).then((serverResponse) => {
          //   console.log(serverResponse);
          //   const processJsondata = JSON.parse(
          //     serverResponse.data.global_costing
          //   );
          //   console.log(`processJsondataGC`, processJsondata);
          //   setGlobalCosting(processJsondata);
          //   //return processJsondata;
          //});
          setUpdateAppData(false);
        }
      });
  };

  return (
    <div className="header-container-action">
      <div className="header-action-item headline">
        <h1>Price list of MHT Pricing</h1>
      </div>

      <div className="header-action-item action">
        <button
          type="button"
          disabled={!updateAppData ? "no" : ""}
          onClick={updateProducts}
        >
          {updateButtonText}
        </button>
      </div>
    </div>
  );
}
