'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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

        // 🛠️ Clean and convert data
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
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Schedules per Day</h2>
      {chartData.length > 0 ? (
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}
