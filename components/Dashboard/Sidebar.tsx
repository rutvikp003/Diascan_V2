import React from 'react';
import { FaHome, FaEnvelope, FaHandHoldingMedical, FaClipboard, FaUserMd } from 'react-icons/fa';
import { VscFeedback } from "react-icons/vsc";
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
          <FaHandHoldingMedical />
          <Link href="/Health_&_wellness">
          Health & Wellness Hub
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <FaClipboard />
          <Link href="/Guidelines">
              Guidlines
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <FaUserMd />
          <Link href="/contact">
              Support
          </Link>
        </li>
      </ul>
    </aside>
    </>
  );
};

export default Sidebar;
