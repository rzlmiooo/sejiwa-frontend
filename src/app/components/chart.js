'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ChartComponent() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://sejiwa.onrender.com/api/analytics/scheduleCharts',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const cleanedData = Array.isArray(res.data)
          ? res.data.map(item => ({
              date: item.schedule_date?.split('T')[0], 
              count: Number(item.total_appointments),
            }))
          : [];
        setChartData(cleanedData);
      } catch (error) {
        console.error('Error loading chart data:', error);
      }
    };
    fetchChartData();
  }, []);

  return (
    <div className="p-1 w-full h-64">
      <h2 className="text-xl font-semibold mb-2">Schedules per Day</h2>
      {chartData.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}
