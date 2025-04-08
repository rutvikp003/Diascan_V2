'use client';
import React from 'react';

const Header = () => {
  return (
  <>
    <div className="px-4 m-4 rounded-2xl py-4 shadow-sm bg-blue-200 ">
      {/* Title and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-800">
          Your Data for the AI Prediction of Diabetes
        </h2>
        <div className="flex gap-2 mt-2 md:mt-0">
          {['Month', '6 Months', '1 Year', 'All time'].map((label, idx) => (
            <button
              key={label}
              className={`px-4 py-1.5 text-sm rounded-full border ${
                idx === 0
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};

export default Header;
