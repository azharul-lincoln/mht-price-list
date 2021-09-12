import React from "react";
import BrandItem from "./BrandItem";

const PriceListRow = ({ tireSize, manufacturers }) => {
  //console.log(manufacturers);
  return (
    <div className="mht-plist-row">
      <div className="tire-size plist-row-item">
        <h3>{tireSize}</h3>
      </div>

      <div className="tire-detail-container plist-row-item">
        <div className="brand-items">
          {Object.entries(manufacturers).map(([key, manufacturer]) => {
            // Pretty straightforward - use key for the key and value for the value.
            // Just to clarify: unlike object destructuring, the parameter names don't matter here.
            //console.log(value);
            return (
              <BrandItem
                item={manufacturer}
                manufacturerKey={key}
                tireSize={tireSize}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PriceListRow;
