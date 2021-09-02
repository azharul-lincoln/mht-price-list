import React from "react";
import { Header } from "./components/Header/Header";
import Body from "./components/Body";
import HeaderTop from "./components/Header/HeaderTop";

function App() {
  return (
    <React.Fragment>
      <HeaderTop />
      <div className="mht-price-list">
        <Header />
        <Body />
      </div>
    </React.Fragment>
  );
}
export default App;
