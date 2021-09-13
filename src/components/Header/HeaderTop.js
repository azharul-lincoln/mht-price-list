import React, { useContext, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";

import {
  ProductContext,
  UpdateAppDataContext,
  GlobalCostingContext,
} from "../../App";
import GlobalCostingSlidingPane from "../SlidingPane/GlobalCostingSlidingPane";

export default function HeaderTop({ url }) {
  const { products, setProducts } = useContext(ProductContext);
  const { updateAppData, setUpdateAppData } = useContext(UpdateAppDataContext);
  const [openPanel, setOpenPanel] = useState(false);
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
    <React.Fragment>
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

        <div className="gobal-settings">
          <div className="icon-container">
            <a href="#" onClick={() => setOpenPanel(true)}>
              <IoMdSettings />
            </a>
          </div>
        </div>
      </div>
      <GlobalCostingSlidingPane
        openPanel={openPanel}
        setOpenPanel={setOpenPanel}
      />
    </React.Fragment>
  );
}
