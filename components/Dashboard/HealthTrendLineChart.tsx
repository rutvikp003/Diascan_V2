'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface HealthDataEntry {
  timestamp: string;
  fasting_glucose: number;
  insulin_level: number;
}

interface HealthTrendAreaChartProps {
  data: HealthDataEntry[];
}

const HealthTrendAreaChart: React.FC<HealthTrendAreaChartProps> = ({ data }) => {
  const [visibleKeys, setVisibleKeys] = useState<string[]>(['fasting_glucose', 'insulin_level']);

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No health data available.</p>;
  }
  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    // If only one key is visible and it's being clicked, show both
    if (visibleKeys.length === 1 && visibleKeys.includes(dataKey)) {
      setVisibleKeys(['fasting_glucose', 'insulin_level']);
    } else {
      setVisibleKeys([dataKey]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 w-full h-80">
      <h2 className="text-lg font-semibold mb-4 text-dark dark:text-dark">
        Glucose & Insulin Level Trends
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            angle={0}
            textAnchor="end"
            interval={0}
          />
          <YAxis />
          <Tooltip 
            labelClassName='text-gray-900'/>
          <Legend 
            onClick={handleLegendClick}/>
          {visibleKeys.includes('fasting_glucose') && (
            <Area
              type="monotone"
              dataKey="fasting_glucose"
              stroke="#60a5fa"
              fill="#bfd5f5"
              strokeWidth={2}
              name="Glucose"
              isAnimationActive={true}
            />
          )}
          {visibleKeys.includes('insulin_level') && (
            <Area
              type="monotone"
              dataKey="insulin_level"
              stroke="#f87171"
              fill="#fec5c5"
              strokeWidth={2}
              name="Insulin"
              isAnimationActive={true}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthTrendAreaChart;
