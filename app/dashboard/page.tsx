'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import Header from '@/components/Dashboard/Header_dash';
import DataCard from '@/components/Dashboard/DataCard';
import Calendar from '@/components/Dashboard/Calendar';
import RiskMeter from '@/components/Dashboard/RiskMeter';
import HealthTrendLineChart from '@/components/Dashboard/HealthTrendLineChart';


const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Diascan";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Sign in to access Diascan features.");
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const Email = localStorage.getItem("Email")?.replace(/^"|"$/g, "");

    const token = localStorage.getItem("token");
  
    if (!Email || !token) {
      setError("Please sign in to view your dashboard.");
      setLoading(false);
      return;
    }
  
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8004/dashboard-data/${Email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        console.log("this is result",result);
        if (!response.ok) throw new Error(result.detail || "Failed to fetch data");
  
        setData(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const latest = data.length > 0 ? data[0] : null;
  const previous = data.length > 1 ? data[1] : null;
  const date = (value) => new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const calculateChange = (latestValue, prevValue) => {
    if (!latestValue || !prevValue) return { value: "N/A", type: "neutral" };
    const change = parseFloat(latestValue) - parseFloat(prevValue);
    const type = change > 0 ? "positive" : change < 0 ? "negative" : "neutral";
    return { value: Math.abs(change).toFixed(2), type };
  };

  return (
    <div className="flex flex-col md:flex-row mt-24 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <div className="p-4 sm:p-6">
          {loading ? (
            <p className="text-gray-700 dark:text-gray-200">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : latest ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                <DataCard
                  title="Age"
                  value={latest.age || '-'}
                  change={calculateChange(latest.c_peptide, previous?.c_peptide)}
                />
                <DataCard
                  title="Glucose Level"
                  value={`${latest.fasting_glucose || '-'} mg/dL`}
                  change={calculateChange(latest.fasting_glucose, previous?.fasting_glucose)}
                />
                <DataCard
                  title="C_peptide"
                  value={latest.c_peptide || '-'}
                  change={calculateChange(latest.c_peptide, previous?.c_peptide)}
                />
                <DataCard
                  title="Hemoglobin A1c"
                  value={latest.c_peptide || '-'}
                  change={calculateChange(latest.c_peptide, previous?.c_peptide)}
                />
                <DataCard
                  title="BMI"
                  value={latest.bmi || '-'}
                  change={calculateChange(latest.bmi, previous?.bmi)}
                />
                <DataCard
                  title="Insulin"
                  value={`${latest.insulin_level || '-'} mu U/ml`}
                  change={calculateChange(latest.insulin_level
                    , previous?.insulin_level)}
                />
                <DataCard
                  title="Damage Risk Level"
                  value={latest.overall_damage_probability || '-'}
                />
                <DataCard
                  title="Last Assessment Date"
                  value={latest.timestamp
                          ? new Date(latest.timestamp).toLocaleDateString()
                          : '-'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  {loading ? <p>Loading...</p> : <HealthTrendLineChart data={data} />}
                </div>
                <div className="lg:col-span-1">
                  <RiskMeter data={latest.overall_damage_probability}/>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600">No assessment data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;