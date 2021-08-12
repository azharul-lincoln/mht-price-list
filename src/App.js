import React from "react";
import { Header } from "./components/Header";
import Body from "./components/Body";

function App() {
  return (
    <React.Fragment>
      <h1>Price list of MHT Pricing</h1>
      <div className="mht-price-list">
        <Header />
        <Body />
      </div>
    </React.Fragment>
  );
}
export default App;
