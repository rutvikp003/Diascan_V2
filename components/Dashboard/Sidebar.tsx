import React from 'react';
import { FaHome, FaEnvelope, FaFileAlt, FaClipboard, FaUserMd } from 'react-icons/fa';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <>
    <aside className="w-64 bg-blue-200 h-100vh p-6 dark:bg-blue-900">
      <h1 className="text-xl font-semibold mb-8">Medical Center</h1>
      <ul className="space-y-6">
        <li className="flex items-center space-x-4">
          <FaHome />
          <Link href="/">
              Home
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <FaEnvelope />
          <span>Messages</span>
        </li>
        <li className="flex items-center space-x-4">
          <FaFileAlt />
          <span>AI Reports</span>
        </li>
        <li className="flex items-center space-x-4">
          <FaClipboard />
          <Link href="/"> we have to add new guidlines page
              Guidlines
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <FaUserMd />
          <span>Help</span>
        </li>
      </ul>
    </aside>
    </>
  );
};

export default Sidebar;
