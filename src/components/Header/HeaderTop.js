import React from "react";

export default function HeaderTop() {
  const disabledVal = false;

  return (
    <div className="header-container-action">
      <div className="header-action-item headline">
        <h1>Price list of MHT Pricing</h1>
      </div>

      <div className="header-action-item action">
        <button disabled={disabledVal} type="button">
          UPDATE
        </button>
      </div>
    </div>
  );
}
