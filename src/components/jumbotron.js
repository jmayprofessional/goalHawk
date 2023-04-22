import React from "react";

const Jumbotron = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white py-32"
      style={{ backgroundImage: "url('/nyrangersBanner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">GoalHawk, Major League Stats</h1>
        <p className="text-lg mb-4">
          Your Barn, your lines, your call. Mix and match, explore, see what could happen.
        </p>
        <button className="bg-white text-gray-800 px-4 py-2 rounded-md shadow">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Jumbotron;