import React from "react";
import Header from "./Header";
import Item from "./Item";

function Main({ merchantsInfo, catalog, images }) {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Header merchantsInfo={merchantsInfo} />
      <div className="flex gap-2 flex-wrap m-5">
        {catalog.objects.map((item) => (
          <Item key={item.id} item={item} image={images[item.id]} />
        ))}
      </div>
    </div>
  );
}

export default Main;
