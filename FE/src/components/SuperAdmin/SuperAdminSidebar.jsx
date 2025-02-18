import React, { useState } from 'react';
import { FaUsers, FaUserShield, FaChartBar, FaCog } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import MembersList from './Members';
import JoinRequestList from './JoinRequest';

const SuperAdminSidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, component: <div>Dashboard Component</div> },
    { name: "Members", icon: <FaUsers />, component:<MembersList/> },
    { name: "Verify Members", icon: <FaUserShield />, component: <div>Verify Members Component</div> },
    { name: "Join-Request", icon: <FaChartBar />, component: <JoinRequestList/> },
    { name: "Settings", icon: <FaCog />, component: <div>Settings Component</div> }
  ];

  const handleItemClick = (itemName, component) => {
    setSelectedItem({ name: itemName, component });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-white shadow-md">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => handleItemClick(item.name, item.component)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    selectedItem?.name === item.name
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6">
        {selectedItem ? (
          <div>
            <h1 className="text-xl font-bold">{selectedItem.name}</h1>
            <div className="mt-4">{selectedItem.component}</div>
          </div>
        ) : (
          <div>Select an option from the sidebar</div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
