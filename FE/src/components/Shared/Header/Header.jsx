
import React, { useEffect, useState, useMemo } from "react";
import netloop from "../../../images/netloop.png";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTravelExplore, MdOutlineGroups3 } from "react-icons/md";
import { AiTwotoneMessage } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { memberInfo } from "../../../utils/auth";
import { useGetMemberQuery } from "../../../redux/api/member";
import ProfileDP from "./ProfileDP";
import NotificationPage from "../../Notification/NotificationPage";
import { useDispatch } from "react-redux";
import { setMember } from "../../../redux/feature/memberSlice";
import { setProfile } from "../../../redux/feature/profileSlice";
import SearchItem from "../SearchItem";

const Header = ({chat}) => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const member = memberInfo();
  const id = member ? member.id : null;

  const { data } = useGetMemberQuery(id, { skip: !id });

  const memb = useMemo(() => {
    if (data?.id) {
      return {
        name: data.name,
        id: data.id,
        network: data.networks || [],
        verified: data.verified ?? false,
        memberData: data || null,
      };
    }
    return null;
  }, [data]);

  useEffect(() => {
    if (memb) {
      dispatch(setMember(memb));
    }
  }, [memb, dispatch]);

  useEffect(() => {
    if (data?.profile) {
      dispatch(
        setProfile({
          id: data?.profile.id,
          img: data?.profile.img,
          memberId: data?.profile.memberId,
          bio: data?.profile.bio,
        })
      );
    }
  }, [data, dispatch]);

  const navItems = [
    { label: "Home", href: "/", icon: <IoHomeOutline className="text-2xl" /> },
    {
      label: "Explore",
      href: "/explore",
      icon: <MdOutlineTravelExplore className="text-2xl" />,
    },
    {
      label: "Network",
      href: "/network",
      icon: <MdOutlineGroups3 className="text-2xl" />,
    },
    {
      label: "Message",
      href: "/message",
      icon: <AiTwotoneMessage className="text-2xl" />,
    },
    { label: "Notification", href: "#", icon: <NotificationPage /> },
  ];

  return (
    <nav className={`bg-white text-gray-800 shadow-md ${chat? "" : "fixed top-0"} w-full z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold">
              <img src={netloop} alt="Netloop" className="w-32 md:w-48" />
            </NavLink>
          </div>

          {/* Search Section */}
          <div className="hidden md:block mx-4 flex-grow max-w-md">
            <SearchItem />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className="hover:text-primary hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md text-gray-700"
              >
                <span className="flex flex-col justify-center items-center text-xs">
                  {item.icon}
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mx-4 flex-grow w-32 pt-1 max-w-md">
            <SearchItem />
          </div>

          {/* Profile / Login Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center justify-center">
              {data?.profile ? (
                <ProfileDP data={data} />
              ) : (
                <NavLink to="/login">
                  <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all duration-200">
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border border-gray-300 absolute right-4 top-16 rounded-lg w-48">
            <div className="px-4 py-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className="block text-gray-700 hover:text-primary hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md"
                >
                  <span className="flex gap-3 items-center text-sm">
                    {item.icon}
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
