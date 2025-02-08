import React from "react";
import { IoPeople } from "react-icons/io5";
import { FaRegHeart, FaInstagram } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { Button } from "@nextui-org/react";
import { MdModeEditOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useGetDetailsQuery } from "../../redux/api/details";
import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin, FaFacebook, FaLink } from "react-icons/fa6";
import ReadMore from "../../utils/truncate";

export default function ProfileInfo() {
  const { memberData } = useSelector((state) => state.member);
  const id = memberData?.profile?.details?.id || "";
  const { data: detaildata, isLoading } = useGetDetailsQuery(id);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 lg:w-[70%] rounded-lg shadow-lg border border-gray-200">
      {/* Overview Section */}
      {detaildata?.overview && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700">Overview</h2>
          <p className="text-gray-600 mt-2 text-xs"><ReadMore text={detaildata?.overview} /></p>
        </div>
      )}

      {/* Interests Section */}
      {detaildata?.interests?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700">Interests</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {detaildata?.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies Section */}
      {detaildata?.hobbie?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700">Hobbies</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {detaildata?.hobbie?.map((hobby, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      )}
      {detaildata?.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {detaildata?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Relationship Status */}
      {detaildata?.relationStatus && (
        <div className="mb-6 flex items-center text-gray-700 text-sm">
          <FaRegHeart className="text-red-500 text-lg mr-2" />
          <span className="font-medium">{detaildata?.relationStatus}</span>
        </div>
      )}

      {/* Social Links */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700">Social Links</h2>
        <div className="flex flex-col gap-3 mt-2">
          {detaildata?.instagram && (
            <a
              href={detaildata?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary transition text-sm"
            >
              <FaInstagram className="text-pink-500 text-lg mr-2" />
              Instagram
            </a>
          )}

          {detaildata?.linkedin && (
            <a
              href={detaildata?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary transition text-sm"
            >
              <FaLinkedin className="text-blue-600 text-lg mr-2" />
              LinkedIn
            </a>
          )}

          {detaildata?.facebook && (
            <a
              href={detaildata?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary transition text-sm"
            >
              <FaFacebook className="text-blue-500 text-lg mr-2" />
              Facebook
            </a>
          )}

          {detaildata?.github && (
            <a
              href={detaildata?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary transition text-sm"
            >
              <FaGithub className="text-gray-800 text-lg mr-2" />
              Github
            </a>
          )}

          {detaildata?.website && (
            <a
              href={detaildata?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary transition text-sm"
            >
              <FaLink className="text-gray-500 text-lg mr-2" />
              Website
            </a>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center mt-6">
        <NavLink to={`/profile/details-edit/${id}`}>
          <Button
            className="bg-primary text-white rounded-lg px-5 py-2 flex items-center gap-2 shadow-md hover:bg-primary-dark transition"
          >
            <MdModeEditOutline />
            Edit Details
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
