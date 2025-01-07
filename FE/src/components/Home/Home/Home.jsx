import React from "react";

// import Footer from '../../Shared/Footer/Footer';

import Header from "../../Shared/Header/Header";
import Story from "../Story/Story";
import Posts from "../Posts/Posts";

import SideNotify from "../SideCompo/SideNotify";
import SideProfile from "../SideCompo/SideProfile";

const Home = () => {
  return (
    <div className="bg-gray-200 min-h-screen ">
      <div className="fixed top-0 w-full h-full z-[10]">
        <Header></Header>
      </div>

      <div className="flex justify-center gap-4 ">
        <SideProfile />
        <hero className="flex w-screen xl:w-[40%] h-full flex-col justify-center items-center
         bg-transparent mt-20">
          <Story />
          <Posts />
        </hero>
        <SideNotify />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
