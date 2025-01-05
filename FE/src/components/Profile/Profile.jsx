import React from "react";
import ProfilePersonal from "./ProfilePersonal";
import ProfileInfo from "./ProfileInfo";
import ProfilePost from "./ProfilePost";
import ProfileTab from "./ProfileTab";

const Profile = () => {
 

  return (
    <div className="md:min-h-screen px-8 py-2">
      <div className="max-w-4xl mx-auto  rounded-xl shadow-sm">
        
        <ProfilePersonal/>
        <ProfileTab/>
       {/* <ProfileInfo/> */}
        {/* Grid Gallery */}
       {/* <ProfilePost/> */}
      </div>
    </div>
  );
};

export default Profile;
