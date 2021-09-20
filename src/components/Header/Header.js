import React from "react";
import HeaderDetail from "./HeaderDetail";

export const Header = () => {
  return (
    <React.Fragment>
      <div className="mht-plist-row plist-header">
        <div className="tire-size plist-row-item">
          <h3>Tire Size</h3>
        </div>
        <div className="tire-detail-container plist-row-item">
          <div className="tire-manufacturer tire-set-item">
            <h3>Manufacturer</h3>
          </div>

          <div className="tire-cost tire-set-item">
            <h3>Cost</h3>
          </div>

          <div className="tire-set-item">
            <div className="titel">
              <h3>2 tire set</h3>
            </div>
            {/* <HeaderDetail /> */}
          </div>

          <div className="tire-set-item">
            <div className="titel">
              <h3>4 tire set</h3>
            </div>
            {/* <HeaderDetail /> */}
          </div>

          <div className="tire-set-item">
            <div className="titel">
              <h3>6 tire set</h3>
            </div>
            {/* <HeaderDetail /> */}
          </div>

          <div className="tire-set-item">
            <div className="titel">
              <h3>8 tire set</h3>
            </div>
            {/* <HeaderDetail /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
