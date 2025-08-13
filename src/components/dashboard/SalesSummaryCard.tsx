import React from 'react';
import { Card } from '@/components/ui/Card';
import { SalesSummary } from '@/types/sales';

interface SalesSummaryCardProps {
  summary: SalesSummary;
  className?: string;
}

export const SalesSummaryCard: React.FC<SalesSummaryCardProps> = ({ summary, className = '' }) => {
  return (
    <Card className={`${className}`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{summary.year}</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-xl font-semibold text-green-600">
              ${summary.totalSales.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-lg font-medium text-blue-600">
              {summary.totalOrders.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Order Value</p>
            <p className="text-lg font-medium text-purple-600">
              ${summary.averageOrderValue.toLocaleString()}
            </p>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-600">Top Category</p>
            <p className="text-sm font-medium text-gray-800">{summary.topCategory}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Top Region</p>
            <p className="text-sm font-medium text-gray-800">{summary.topRegion}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
