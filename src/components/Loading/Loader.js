import React from "react";
import Skeleton from "@yisheng90/react-loading";

export default function Loader() {
  return (
    <React.Fragment>
      <div style={{ fontSize: "22px", margin: "20px 0" }}>Loading...</div>
      <Skeleton width={"100%"} height={60} rows={20} color={"#ddd"} />
    </React.Fragment>
  );
}
