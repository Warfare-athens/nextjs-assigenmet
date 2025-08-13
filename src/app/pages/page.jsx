"use client"

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Papa from 'papaparse';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('All');

  useEffect(() => {
    fetch('/data.csv')
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true, dynamicTyping: true });
        setData(parsed.data);
        setFilteredData(parsed.data);
      });
  }, []);

  useEffect(() => {
    if (selectedCity === 'All') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(d => d.City === selectedCity));
    }
  }, [selectedCity, data]);

  const uniqueCities = [...new Set(data.map((d) => d.City))];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Walmart Sales Dashboard</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by City:</label>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="border px-2 py-1 rounded">
          <option>All</option>
          {uniqueCities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <div className="overflow-auto max-h-96 border rounded mb-8">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key} className="px-4 py-2 border">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="px-4 py-2 border">{val?.toString()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Line Chart - Total by Invoice ID</h2>
          <LineChart width={500} height={300} data={filteredData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="Invoice ID" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Total" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Bar Chart */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Bar Chart - Quantity by Product Line</h2>
          <BarChart width={500} height={300} data={filteredData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="Product line" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Quantity" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Pie Chart - Payment Types</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={Object.entries(
                filteredData.reduce((acc, cur) => {
                  acc[cur.Payment] = (acc[cur.Payment] || 0) + 1;
                  return acc;
                }, {})
              ).map(([name, value]) => ({ name, value }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {filteredData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Histogram (using bar chart) */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Histogram - Rating Distribution</h2>
          <BarChart width={500} height={300} data={createHistogram(filteredData, 'Rating', 5)}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ff8042" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

function createHistogram(data, field, bins) {
  if (!data || data.length === 0 || !data[0][field]) return [];

  const values = data.map(d => d[field]).filter(v => typeof v === 'number');
  if (values.length === 0) return [];

  const min = Math.min(...values);
  const max = Math.max(...values);
  const binSize = (max - min) / bins;

  const histogram = Array.from({ length: bins }, (_, i) => ({
    range: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
    count: 0,
  }));

  values.forEach((val) => {
    const idx = Math.min(Math.floor((val - min) / binSize), bins - 1);
    histogram[idx].count += 1;
  });

  return histogram;
}

