import React from "react";

const PriceListRow = (tireSize, manufacturers) => {
  console.log(manufacturers);
  return (
    <div className="mht-plist-row">
      <div className="tire-size plist-row-item">
        <h3>{tireSize.tireSize}</h3>
      </div>
    </div>
  );
};

export default PriceListRow;
