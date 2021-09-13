import React, { useContext, useState } from "react";
import SlidingPane from "react-sliding-pane";

import { ProductContext, GlobalCostingContext } from "../../App";

export default function GlobalCostingSlidingPane({ openPanel, setOpenPanel }) {
  const { globalCosting, setGlobalCosting } = useContext(GlobalCostingContext);
  //const [openPanel, setOpenPanel] = useState(false);

  const handleChange = (objProperty, field, value) => {
    setGlobalCosting({
      ...globalCosting,
      [objProperty]: {
        ...globalCosting[objProperty],
        [field]: value,
      },
    });
  };
  console.log(globalCosting);

  return (
    <React.Fragment>
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
                      onChange={(e) =>
                        handleChange("twoTireSet", "ic", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.twoTireSet.fc}
                      onChange={(e) =>
                        handleChange("twoTireSet", "fc", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.twoTireSet.cc}
                      onChange={(e) =>
                        handleChange("twoTireSet", "cc", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">4 Tire Set</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.fourTireSet.ic}
                      onChange={(e) =>
                        handleChange("fourTireSet", "ic", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.fourTireSet.fc}
                      onChange={(e) =>
                        handleChange("fourTireSet", "fc", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.fourTireSet.cc}
                      onChange={(e) =>
                        handleChange("fourTireSet", "cc", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">6 Tire Set</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.sixTireSet.ic}
                      onChange={(e) =>
                        handleChange("sixTireSet", "ic", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.sixTireSet.fc}
                      onChange={(e) =>
                        handleChange("sixTireSet", "fc", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.sixTireSet.cc}
                      onChange={(e) =>
                        handleChange("sixTireSet", "cc", e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">8 Tire Set</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.eightTireSet.ic}
                      onChange={(e) =>
                        handleChange("eightTireSet", "ic", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.eightTireSet.fc}
                      onChange={(e) =>
                        handleChange("eightTireSet", "fc", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={globalCosting.eightTireSet.cc}
                      onChange={(e) =>
                        handleChange("eightTireSet", "cc", e.target.value)
                      }
                    />
                  </td>
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