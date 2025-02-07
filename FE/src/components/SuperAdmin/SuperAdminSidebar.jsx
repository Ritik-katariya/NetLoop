import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaUserShield, FaChartBar, FaCog } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const SuperAdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/super-admin/dashboard',
      name: 'Dashboard',
      icon: <MdDashboard />
    },
    {
      path: '/super-admin/admins',
      name: 'Manage Admins',
      icon: <FaUserShield />
    },
    {
      path: '/super-admin/members',
      name: 'Members',
      icon: <FaUsers />
    },
    {
      path: '/super-admin/analytics',
      name: 'Analytics',
      icon: <FaChartBar />
    },
    {
      path: '/super-admin/settings',
      name: 'Settings',
      icon: <FaCog />
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems?.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SuperAdminSidebar; 