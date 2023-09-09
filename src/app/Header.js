import React from "react";

function Header({ merchantsInfo }) {
  const name = merchantsInfo[0][0].businessName;
  return (
    <header>
      <div className="flex justify-end border-b py-3 px-4 border-black shadow-md bg-black ">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
          alt="Your Name"
          className="w-12 rounded-full"
        />
        <h1 className="py-3 mr-3 ml-2 text-white">{name}</h1>
      </div>
    </header>
  );
}

export default Header;
