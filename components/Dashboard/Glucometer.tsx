'use client';

import React from 'react';
import Image from 'next/image';

const Glucometer = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center bg-white dark:bg-gray-100">
      <p className="text-sm font-medium text-gray-700">
        Your glucose measurement on <strong>December 14</strong> was <strong>94 mg/dL</strong>
      </p>
      <p className="text-xs text-gray-700 mt-1">5 mg less than last week</p>

      {/* Glucometer image */}
      <div className="mt-4">
        <Image
          src="/images/dashboard/glucometer.png"
          alt="Glucometer"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

export default Glucometer;
