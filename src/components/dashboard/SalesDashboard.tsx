"use client"
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChartSelector } from '@/components/charts/ChartSelector';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { PieChart } from '@/components/charts/PieChart';
import { SalesSummaryCard } from '@/components/dashboard/SalesSummaryCard';
import { getSalesSummary, getChartData } from '@/services/salesData';
import { ChartType } from '@/types/sales';

export const SalesDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('bar');
  const [salesThreshold, setSalesThreshold] = useState(1000);
  const [dataType, setDataType] = useState<'category' | 'region' | 'monthly'>('category');

  const years = [2022, 2023, 2024];
  const dataTypes = [
    { value: 'category', label: 'Category' },
    { value: 'region', label: 'Region' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const chartData = useMemo(() => {
    return getChartData(selectedYear, dataType);
  }, [selectedYear, dataType]);

  const filteredData = useMemo(() => {
    return chartData.filter(item => item.value >= salesThreshold);
  }, [chartData, salesThreshold]);

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      className: 'w-full'
    };

    switch (selectedChartType) {
      case 'bar':
        return <BarChart {...commonProps} title={`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} Sales - ${selectedYear}`} />;
      case 'line':
        return <LineChart {...commonProps} title={`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} Sales - ${selectedYear}`} />;
      case 'pie':
        return <PieChart {...commonProps} title={`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} Sales - ${selectedYear}`} />;
      default:
        return <BarChart {...commonProps} title={`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} Sales - ${selectedYear}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Dashboard</h1>
          <p className="text-gray-600">Comprehensive sales analytics for 2022-2024</p>
        </div>

        {/* Year Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Select Year</h2>
          <div className="flex space-x-3">
            {years.map(year => (
              <Button
                key={year}
                variant={selectedYear === year ? 'primary' : 'outline'}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>

        {/* Sales Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {years.map(year => (
            <SalesSummaryCard
              key={year}
              summary={getSalesSummary(year)}
              className={selectedYear === year ? 'ring-2 ring-blue-500' : ''}
            />
          ))}
        </div>

        {/* Chart Controls */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value as 'category' | 'region' | 'monthly')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {dataTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Input
                type="number"
                label="Sales Threshold ($)"
                value={salesThreshold}
                onChange={setSalesThreshold}
                min={0}
                placeholder="Enter threshold"
              />
            </div>

            <div className="md:col-span-2">
              <ChartSelector
                selectedType={selectedChartType}
                onTypeChange={setSelectedChartType}
                className="justify-end"
              />
            </div>
          </div>
        </Card>

        {/* Chart Display */}
        <Card>
          {filteredData.length > 0 ? (
            renderChart()
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No data available for the selected threshold</p>
              <p className="text-gray-400 text-sm">Try lowering the sales threshold</p>
            </div>
          )}
        </Card>

        {/* Data Table */}
        {filteredData.length > 0 && (
          <Card className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Table</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.value.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
