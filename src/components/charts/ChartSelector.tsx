import React from 'react';
import { Button } from '@/components/ui/Button';
import { ChartType } from '@/types/sales';

interface ChartSelectorProps {
  selectedType: ChartType;
  onTypeChange: (type: ChartType) => void;
  className?: string;
}

export const ChartSelector: React.FC<ChartSelectorProps> = ({
  selectedType,
  onTypeChange,
  className = ''
}) => {
  const chartTypes: { type: ChartType; label: string; icon: string }[] = [
    { type: 'bar', label: 'Bar Chart', icon: '📊' },
    { type: 'line', label: 'Line Chart', icon: '📈' },
    { type: 'pie', label: 'Pie Chart', icon: '🥧' }
  ];

  return (
    <div className={`flex space-x-2 ${className}`}>
      {chartTypes.map(({ type, label, icon }) => (
        <Button
          key={type}
          variant={selectedType === type ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onTypeChange(type)}
          className="flex items-center space-x-2"
        >
          <span>{icon}</span>
          <span>{label}</span>
        </Button>
      ))}
    </div>
  );
};
