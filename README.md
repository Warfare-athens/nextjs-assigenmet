# Sales Dashboard

A comprehensive analytics dashboard built with Next.js 15, TypeScript, and Tailwind CSS, featuring interactive charts and sales data visualization for 2022-2024.

## 🚀 Features

### Core Functionality
- **Multi-Year Sales Analysis**: View sales data for 2022, 2023, and 2024
- **Interactive Charts**: Switch between Bar, Line, and Pie charts using Recharts
- **Real-time Data Filtering**: Custom sales threshold filtering
- **Multiple Data Views**: Category, Region, and Monthly breakdowns
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Advanced Features
- **Custom Filter Input**: Set your own sales threshold to filter data
- **Chart Type Switching**: Dynamic chart rendering (Bar, Line, Pie)
- **Data Table View**: Tabular representation of filtered data
- **Sales Summary Cards**: Key metrics display for each year
- **Atomic Component Architecture**: Modular, reusable components

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── dashboard/         # Dashboard page route
│   │   └── page.tsx      # Dashboard page component
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.tsx           # Home page with navigation
├── components/            # Atomic component structure
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx    # Reusable button component
│   │   ├── Card.tsx      # Card container component
│   │   └── Input.tsx     # Form input component
│   ├── charts/           # Chart components
│   │   ├── BarChart.tsx  # Bar chart using Recharts
│   │   ├── LineChart.tsx # Line chart using Recharts
│   │   ├── PieChart.tsx  # Pie chart using Recharts
│   │   └── ChartSelector.tsx # Chart type selector
│   └── dashboard/        # Dashboard-specific components
│       ├── SalesDashboard.tsx    # Main dashboard component
│       └── SalesSummaryCard.tsx  # Sales summary display
├── services/             # Data services
│   └── salesData.ts     # Mock data generation and processing
├── types/                # TypeScript type definitions
│   └── sales.ts         # Sales data interfaces
└── types/                # TypeScript configuration
    └── tsconfig.json    # TypeScript compiler options
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts (React charting library)
- **State Management**: React Hooks (useState, useMemo)
- **Build Tool**: Turbopack (Next.js 15 default)

## 📊 Data Structure

### Sales Data Interface
```typescript
interface SalesData {
  id: string;
  date: string;
  product: string;
  category: string;
  amount: number;
  region: string;
  year: number;
}
```

### Generated Mock Data
- **2022**: 1,200 sales records
- **2023**: 1,500 sales records  
- **2024**: 800 sales records
- **Products**: Laptop, Smartphone, Tablet, Headphones, Monitor, Keyboard, Mouse, Speaker
- **Categories**: Electronics, Computers, Mobile, Audio, Accessories
- **Regions**: North America, Europe, Asia Pacific, Latin America, Middle East

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sales-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Usage Guide

### Dashboard Navigation
1. **Home Page**: Click "View Dashboard" to access the main dashboard
2. **Year Selection**: Choose between 2022, 2023, or 2024 using the year buttons
3. **Data Type**: Select from Category, Region, or Monthly views
4. **Chart Type**: Switch between Bar, Line, and Pie charts
5. **Custom Filter**: Set minimum sales threshold to filter data

### Chart Interactions
- **Bar Charts**: Vertical bars showing sales by category/region/month
- **Line Charts**: Trend lines for time-series data visualization
- **Pie Charts**: Proportional representation with percentage labels
- **Tooltips**: Hover over chart elements for detailed information

### Data Filtering
- **Threshold Filter**: Set minimum sales amount to focus on high-value transactions
- **Real-time Updates**: Charts and tables update automatically based on filters
- **Empty State Handling**: Clear messaging when no data matches criteria

## 🔧 Customization

### Adding New Chart Types
1. Create new chart component in `src/components/charts/`
2. Add chart type to `ChartType` union in `src/types/sales.ts`
3. Update `ChartSelector` component with new option
4. Implement chart rendering logic in `SalesDashboard`

### Extending Data Sources
1. Modify `src/services/salesData.ts` for new data generation
2. Update TypeScript interfaces in `src/types/sales.ts`
3. Add new data processing functions as needed

### Styling Customization
- Modify Tailwind classes in component files
- Update color schemes in chart components
- Customize responsive breakpoints

## 🚀 Future Enhancements

### Planned Features
- **API Integration**: Replace mock data with real API endpoints
- **Advanced Filtering**: Date ranges, product categories, region selection
- **Export Functionality**: PDF reports, CSV downloads
- **Real-time Updates**: WebSocket integration for live data
- **User Authentication**: Multi-user dashboard access

### Technical Improvements
- **Performance**: Implement React.memo and useCallback optimizations
- **Testing**: Add Jest and React Testing Library
- **State Management**: Consider Zustand or Redux for complex state
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
