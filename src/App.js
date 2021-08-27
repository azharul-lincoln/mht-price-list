import React from "react";
import { Header } from "./components/Header";
import Body from "./components/Body";

function App() {
  const disabledVal = false;
  return (
    <React.Fragment>
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
      <div className="mht-price-list">
        <Header />
        <Body />
      </div>
    </React.Fragment>
  );
}
export default App;
