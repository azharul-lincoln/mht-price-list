import React, { useContext, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import SlidingPane from "react-sliding-pane";

import {
  ProductContext,
  UpdateAppDataContext,
  GlobalCostingContext,
} from "../../App";

export default function HeaderTop({ url }) {
  const { products, setProducts } = useContext(ProductContext);
  const { updateAppData, setUpdateAppData } = useContext(UpdateAppDataContext);
  const { globalCosting, setGlobalCosting } = useContext(GlobalCostingContext);
  console.log(globalCosting);
  const [openPanel, setOpenPanel] = useState(false);
  const updateButtonText = updateAppData ? "SAVE CHANGES" : "SAVED";

  handleChange = (field, value) => {
    //you forgot you are setting metadata of state
    setGlobalCosting({
      ...globalCosting,
      metadata: { ...this.state.metadata, [field]: value },
    });
  };

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

      <SlidingPane
        className="mht-sliding-pan"
        overlayClassName="mht-sliding-pan-overlay"
        isOpen={openPanel}
        title="Global Costing Asumption."
        subtitle=""
        // onRequestClose={() => {
        //   // triggered on "<" on left top click or on outside click
        //   setOpenPanel(false);
        // }}
      >
        <div className="container">
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#Tire Sets</th>
                  <th scope="col">Installation Cost</th>
                  <th scope="col">Freight Cost</th>
                  <th scope="col">Credit Card Charge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">2 Tire Set</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.twoTireSet.ic}
                      onChange={(e) => console.log(e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.twoTireSet.fc}
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.twoTireSet.cc}
                      onChange={(e) => console.log(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">4 Tire Set</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">6 Tire Set</th>
                  <td>Credit Card Charge</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">8 Tire Set</th>
                  <td>Credit Card Charge</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <button onClick={() => setOpenPanel(false)}>close the panel</button>
          </div>
        </div>
      </SlidingPane>
    </React.Fragment>
  );
}
