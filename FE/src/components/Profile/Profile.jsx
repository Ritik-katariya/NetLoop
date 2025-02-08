import React from "react";
import ProfilePersonal from "./ProfilePersonal";
import ProfileTab from "./ProfileTab";

const Profile = () => {
  return (
    <div className="pt-20  md:px-8 py-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl lg:max-w-5xl mx-auto rounded-xl shadow-md bg-white p-6">
        <ProfilePersonal />
        <ProfileTab />
      </div>
    </div>
  );
};

export default Profile;
