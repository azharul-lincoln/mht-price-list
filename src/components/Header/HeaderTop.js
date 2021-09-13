import React, { useContext, useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import { AwesomeButtonProgress } from "react-awesome-button";

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
  const [updateButtonText, setUpdateButtonText] = useState("SAVED");

  const handleGlobalSettingsCick = () => {
    if (updateAppData) {
      alert(
        `Please save the "Cost" changes first before moving to the Global Costing Assumptions settings!`
      );
    } else {
      setOpenPanel(true);
    }
  };

  const updateProducts = async (next) => {
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
          next();
          setUpdateAppData(false);
        }
      });
  };

  useEffect(() => {
    console.log(updateAppData);
    if (updateAppData) {
      setUpdateButtonText("SAVE CHANGES");
    } else {
      setUpdateButtonText("SAVED");
    }
  }, [updateAppData]);

  return (
    <React.Fragment>
      <div className="header-container-action">
        <div className="header-action-item headline">
          <h1>Price list of MHT Pricing</h1>
        </div>

        <div className="header-action-item action">
          <AwesomeButtonProgress
            size="large"
            type="primary"
            loadingLabel="Updating...."
            disabled={!updateAppData}
            fakePress={false}
            action={(element, next) => {
              updateProducts(next);
            }}
          >
            {updateButtonText}
          </AwesomeButtonProgress>
        </div>

        <div className="header-action-item gobal-settings">
          <div className="icon-container">
            <a href="#" onClick={() => handleGlobalSettingsCick()}>
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
