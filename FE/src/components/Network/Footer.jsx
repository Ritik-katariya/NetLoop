import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = ({data}) => {
  return (
    <footer className='bg-white text-white py-10 mt-16'>
      <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* About Section */}
        <div>
          <h3 className='text-xl font-semibold mb-3'>About Us</h3>
          <p className='text-gray-400 text-sm'>
          { data?.about||" We are committed to providing top-quality education and fostering a community of innovators and leaders."}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-xl font-semibold mb-3'>Quick Links</h3>
          <ul className='text-gray-400 text-sm space-y-2'>
            <li><a href='/#' className='hover:text-primary'>About</a></li>
            <li><a href='/#' className='hover:text-primary'>Courses</a></li>
            <li><a href='/#' className='hover:text-primary'>Events</a></li>
            <li><a href='/#' className='hover:text-primary'>Contact</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className='text-xl font-semibold mb-3 '>Contact Us</h3>
          <p className='text-gray-400 text-sm'>
            {data?.address}{data?.city}{data?.state}{data?.country}{data?.pincode}
          </p>
          <p className='text-gray-400 text-sm hover:text-primary'>Phone: +1 234 567 890</p>
          <p className='text-gray-400 text-sm hover:text-primary'>Email: info@example.com</p>
          
          {/* Social Media Links */}
          <div className='flex space-x-4 mt-4'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <FaFacebook className='text-gray-400 hover:text-white text-2xl' />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <FaTwitter className='text-gray-400 hover:text-white text-2xl' />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <FaInstagram className='text-gray-400 hover:text-white text-2xl' />
            </a>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
              <FaLinkedin className='text-gray-400 hover:text-white text-2xl' />
            </a>
            <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'>
              <FaYoutube className='text-gray-400 hover:text-white text-2xl' />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className='text-center text-gray-500 text-sm mt-8'>
        &copy; {new Date().getFullYear()} {data?.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
