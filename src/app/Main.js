"use client";
import React, { useEffect } from "react";

function Main({ merchantsInfo, catalog }) {
  useEffect(() => {
    console.log("merchantsInfo: ", merchantsInfo);
    console.log("catalog: ", catalog);
  }, []);
  return <div>Main</div>;
}

export default Main;
