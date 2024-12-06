import React, { useState } from 'react';
import netloop from '../../../images/netloop.png'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTravelExplore } from "react-icons/md";
import { MdOutlineGroups3 } from "react-icons/md";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/',icon:<IoHomeOutline className='text-2xl' /> },
    { label: 'Explore', href: '/products',icon:<MdOutlineTravelExplore className='text-2xl'/> },
    { label: 'Network', href: '/services',icon:<MdOutlineGroups3 className='text-2xl'/> },
    { label: 'Message', href: '/about',icon:<AiTwotoneMessage className='text-2xl'/> },
    { label: 'Notification', href: '/contact',icon:<IoNotifications className='text-2xl'/> }
  ];

  return (
    <nav className="bg-white text-primary-textd shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold">
                <img src={netloop} alt="Netloop" className='w-48' />
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

          {/* Login/Signup or Avatar */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              <button className="bg-white text-[#03c6c7] px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
                Login/Signup
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 focus:outline-none"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Search for Mobile */}
              <div className="mb-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" 
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

              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className="text-white hover:bg-white/20 block px-3 py-2 rounded-md"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Login/Signup */}
              <div className="pt-4">
                <button className="w-full bg-white text-[#03c6c7] px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
                  Login/Signup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;