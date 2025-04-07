'use client';

import React from 'react';
import {
  LineChart,
  Line,
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

interface HealthTrendLineChartProps {
    data: HealthDataEntry[];
}

const HealthTrendLineChart: React.FC<HealthTrendLineChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No health data available.</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full h-96">
      <h2 className="text-lg font-semibold mb-4">Glucose & Insulin level Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="fasting_glucose"
            stroke="#60a5fa"
            strokeWidth={3}
            name="Glucose"
            dot={false}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="insulin_level"
            stroke="#f87171"
            strokeWidth={3}
            name="insulin"
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthTrendLineChart;
