import { SalesData, SalesSummary } from '@/types/sales';

// Mock data generation based on Kaggle-style sales patterns
const products = [
  'Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Monitor', 'Keyboard', 'Mouse', 'Speaker'
];

const categories = ['Electronics', 'Computers', 'Mobile', 'Audio', 'Accessories'];

const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];

const generateRandomSales = (year: number, count: number): SalesData[] => {
  const sales: SalesData[] = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const product = products[Math.floor(Math.random() * products.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const amount = Math.floor(Math.random() * 2000) + 100; // $100 - $2100
    
    sales.push({
      id: `${year}-${i + 1}`,
      date: date.toISOString().split('T')[0],
      product,
      category,
      amount,
      region,
      year
    });
  }
  
  return sales;
};

export const getSalesData = (): SalesData[] => {
  const data2022 = generateRandomSales(2022, 1200);
  const data2023 = generateRandomSales(2023, 1500);
  const data2024 = generateRandomSales(2024, 800);
  
  return [...data2022, ...data2023, ...data2024];
};

export const getSalesSummary = (year: number): SalesSummary => {
  const data = getSalesData().filter(sale => sale.year === year);
  const totalSales = data.reduce((sum, sale) => sum + sale.amount, 0);
  const totalOrders = data.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  
  // Find top category and region
  const categoryCount = data.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const regionCount = data.reduce((acc, sale) => {
    acc[sale.region] = (acc[sale.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategory = Object.entries(categoryCount).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  const topRegion = Object.entries(regionCount).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  
  return {
    year,
    totalSales,
    totalOrders,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    topCategory,
    topRegion
  };
};

export const getChartData = (year: number, type: 'category' | 'region' | 'monthly') => {
  const data = getSalesData().filter(sale => sale.year === year);
  
  if (type === 'category') {
    const categoryData = data.reduce((acc, sale) => {
      acc[sale.category] = (acc[sale.category] || 0) + sale.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
  }
  
  if (type === 'region') {
    const regionData = data.reduce((acc, sale) => {
      acc[sale.region] = (acc[sale.region] || 0) + sale.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(regionData).map(([name, value]) => ({ name, value }));
  }
  
  if (type === 'monthly') {
    const monthlyData = data.reduce((acc, sale) => {
      const month = new Date(sale.date).getMonth();
      const monthName = new Date(2020, month).toLocaleString('default', { month: 'short' });
      acc[monthName] = (acc[monthName] || 0) + sale.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(monthlyData).map(([name, value]) => ({ name, value }));
  }
  
  return [];
};
