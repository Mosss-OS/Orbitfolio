import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FallbackChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  totalValue: number;
}

export default function FallbackChart({ data, totalValue }: FallbackChartProps) {
  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-card rounded-lg border">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1">Portfolio Overview</h3>
        <p className="text-3xl font-bold">{formatUSD(totalValue)}</p>
        <p className="text-sm text-muted-foreground">2D Fallback View</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatUSD(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Holdings</h4>
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between py-2 border-b last:border-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm">{item.name}</span>
            </div>
            <span className="text-sm font-medium">{formatUSD(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const MOCK_CHART_DATA = [
  { name: 'Wallet', value: 31250, color: '#1F2937' },
  { name: 'DEX', value: 12500, color: '#3B82F6' },
  { name: 'Lending', value: 8500, color: '#F59E0B' },
  { name: 'Staking', value: 20500, color: '#10B981' },
  { name: 'Bridge', value: 14750, color: '#8B5CF6' },
];