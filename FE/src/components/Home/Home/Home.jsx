import React from "react";
import Header from "../../Shared/Header/Header";
import Story from "../Story/Story";
import Posts from "../Posts/Posts";
import SideNotify from "../SideCompo/SideNotify";
import SideProfile from "../SideCompo/SideProfile";

const Home = () => {
  return (
    <div className="bg-gray-200 min-h-screen ">
      {/* Fix: Adjusted z-index so that it does not block clicks */}
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      {/* Keeping the original flexbox layout */}
      <div className="flex w-screen justify-center items-start gap-4 mt-16 max-md:px-1">
        <SideProfile />

        {/* Fixed: Changed 'hero' to 'div' while keeping the same CSS */}
        <div className="flex w-screen xl:w-[40%] h-full flex-col justify-center items-center bg-transparent">
          {/* Ensuring event listeners work */}
          <Story className="cursor-pointer" />
          <Posts className="cursor-pointer" />
        </div>

        <SideNotify />
      </div>
    </div>
  );
};

export default Home;
