interface ProgressBarProps {
  current: number;
  total: number;
  colorFrom?: string;
  colorTo?: string;
}

export function ProgressBar({
  current,
  total,
  colorFrom = "from-blue-500",
  colorTo = "to-purple-500",
}: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`bg-gradient-to-r ${colorFrom} ${colorTo} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
