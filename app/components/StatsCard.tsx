interface StatsCardProps {
  value: number | string;
  label: string;
  color?: "blue" | "green" | "purple" | "red";
}

export function StatsCard({ value, label, color = "blue" }: StatsCardProps) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 text-center">
      <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}
