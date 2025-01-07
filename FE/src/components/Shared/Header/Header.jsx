import React, { useEffect, useState,useMemo  } from 'react';
import netloop from '../../../images/netloop.png'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTravelExplore } from "react-icons/md";
import { MdOutlineGroups3 } from "react-icons/md";
import { AiTwotoneMessage } from "react-icons/ai";
// import { IoNotifications } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { memberInfo } from '../../../utils/auth';
import { useGetMemberQuery } from '../../../redux/api/member';
import ProfileDP from './ProfileDP';
import NotificationPage from '../../Notification/NotificationPage';
import { useDispatch } from 'react-redux';
import { setMember } from '../../../redux/feature/memberSlice';
import { setProfile } from '../../../redux/feature/profileSlice';
const Header = () => {
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
        network: data.networks || [], // Default to empty array if undefined
        verified: data.verified ?? false, // Default to false if undefined
        memberData: data || null, // Pass the full data object
      };
    }
    return null;
  }, [data]);

  // Dispatch `setMember` only when `memb` changes
  useEffect(() => {
    if (memb) {
      dispatch(setMember(memb));
    }
  }, [memb, dispatch]);

useEffect(() => {
  if (data && data.profile) {

    const profiledata = {
      id: data?.profile.id,
      img: data?.profile.img,
      memberId: data?.profile.memberId,
      bio: data?.profile.bio,
    };
    // Define setProfile function or import it from props or context
    dispatch(setProfile(profiledata))
    
  }
}, [data, dispatch]);
  const navItems = [
    { label: 'Home', href: '/', icon: <IoHomeOutline className='text-2xl' /> },
    { label: 'Explore', href: '/explore', icon: <MdOutlineTravelExplore className='text-2xl' /> },
    { label: 'Network', href: '/network', icon: <MdOutlineGroups3 className='text-2xl' /> },
    { label: 'Message', href: '/message', icon: <AiTwotoneMessage className='text-2xl' /> },
    { label: 'Notification', href: '#', icon: <NotificationPage /> },
  ];

  return (
    <nav className="bg-white text-primary-textd md:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold">
                <img src={netloop} alt="Netloop" className='w-32 md:w-48' />
              </a>
            </div>
          </div>

          {/* Search Section */}
          <div className="hidden md:block mx-4 flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg bg-primary-textl text-primary-textd  focus:outline-none focus:ring-2 focus:ring-white/50 pl-12"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-textd"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:bg-white/20 px-3 py-2 rounded-md transition-colors"
              >
                <span className='flex flex-col justify-center items-center text-xs'>
                  {item.icon}
                  {item.label}
                </span>
              </a>
            ))}
          </div>
          {/* mobile search option */}
          <div className=" md:hidden mx-4 -translate-x-4 flex-grow w-32 pt-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full  h-7  rounded-lg bg-primary-textl text-primary-textd  focus:outline-none focus:ring-2 focus:ring-white/50 pl-9"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-textd"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Login/Signup or Avatar */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center justify-center">
              {data ? (
                <ProfileDP data={data} />
              ) : (
                <NavLink to='/login'>
                  <button className="bg-white text-primary hover:text-[rgb(34,183,183)] px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center bg-[#f7f7f7] border-[.2px] rounded-sm border-[#727272]">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-[rgb(34,183,183)] focus:outline-none"
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
        <div className='flex justify-end'>
          {isMenuOpen && (
            <div className="md:hidden w-[180px]   bg-white border-2 border-[#b3b3b3]">
              <div className="px-4  pb-3 space-y-1 sm:px-3">
                {/* Mobile Navigation Links */}
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hover:bg-white/20 px-3 py-2 rounded-md transition-colors"
                  >
                    <span className='flex gap-4 items-center text-sm'>
                      {item.icon}
                      {item.label}
                    </span>
                  </a>
                ))}

                {/* Mobile Login/Signup */}
                <div className="pt-4">
                  <NavLink to='/login'>
                    <button className="w-full bg-white text-[#03c6c7] px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
                      Login/Signup
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;