export interface SalesData {
  id: string;
  date: string;
  product: string;
  category: string;
  amount: number;
  region: string;
  year: number;
}

export interface SalesSummary {
  year: number;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topCategory: string;
  topRegion: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export type ChartType = 'bar' | 'line' | 'pie';
