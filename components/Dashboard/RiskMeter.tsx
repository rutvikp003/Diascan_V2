'use client';
import { stringify } from 'querystring';
import React from 'react';
interface HealthTrendLineChartProps {
  data: string;
}

const RiskMeter : React.FC<HealthTrendLineChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No health data available.</p>;
  }
  const percentage = 50; // You can make this dynamic
  const strokeWidth = 12;
  const radius = 55;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = Math.PI * normalizedRadius;
  const arcLength = (percentage / 100) * circumference;

  
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-md w-full mx-auto relative bg-white dark:bg-gray-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-5">
        AI gives low risk of developing diabetes next year
      </h3>
      {/* SVG Arc Container */}
      <div className="relative flex justify-center items-center" style={{ height: '100px' }}>
        <svg width="250" height="150" viewBox="0 0 140 80">
          {/* Background Arc */}
          <path
            d="M 20 70 A 50 50 0 0 1 120 70"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress Arc */}
          <path
            d="M 20 70 A 50 50 0 0 1 120 70"
            stroke="url(#blueGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            fill="none"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0d6efd" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>

        {/* Centered Text inside Arc */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center mt-4">
          <p className="text-blue-600 text-xl font-bold">{data}</p>
          <p className="text-gray-700 text-sm">
            <span className="text-blue-600 font-bold">Risk of Demage</span>
          </p>
        </div>
      </div>

      {/* Bottom Description */}
      <p className="text-2xs text-gray-500 leading-snug px-2 mt-10">
        AI only provides an assessment on the basis of your data and the clinical data of all patients in the database. Only a doctor can make a correct diagnosis.
      </p>
    </div>
  );
};

export default RiskMeter;