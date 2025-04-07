'use client';

import React from 'react';
import { ArrowDown, ArrowUp } from "lucide-react";
const DataCard = ({ title, value, change }: { title: any; value: any; change?: any }) => {
  const renderArrow = () => {
    if (!change) return null;
    if (change.type === "positive") return <ArrowUp className="text-green-500" />;
    if (change.type === "negative") return <ArrowDown className="text-red-500" />;
    return null;
  };

  return (
  <>
    <div className="text-dark bg-white dark:bg-gray-100 shadow-md rounded-lg p-4 flex flex-col justify-between">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex justify-between items-center gap-2">
        <span className="text-2xl font-bold">{value || "N/A"}</span>
        {change && (
          <div className="flex items-center">
            {renderArrow()}
            <span className={`ml-1 ${change.type === "positive" ? "text-green-500" : "text-red-500"}`}>
              {change.value}
            </span>
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default DataCard;
