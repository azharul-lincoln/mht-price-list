import React from "react";

export const SetItems = ({ setNumber, setItems }) => {
  console.log(setNumber, typeof setItems, setItems);
  const tireSetItemClass = "tire-set-item";
  return (
    <div className={{ setNumber, tireSetItemClass }}>
      {/* if (!empty($tire_set_items)) {
				foreach ($tire_set_items as $tire_set_item) {
			?> */}
      <div className="product-detail-container">
        <div className="product-name">{setItems.produt_name}</div>
        <div className="product-price">{setItems.price}</div>
        <div className="product-quentatty">{setItems.qty}</div>
      </div>
    </div>
  );
};
