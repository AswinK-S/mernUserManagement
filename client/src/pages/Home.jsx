import React from "react";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Our Amazing Website!
        </h1>
        <p className="text-gray-600 mb-6">
          Explore the wonders of our content-rich home page. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-gray-600 mb-6">
          Curious about our latest updates? Check out our blog or navigate
          through the exciting features we offer.
        </p>
      </div>
    </div>
  );
}

export default Home;
