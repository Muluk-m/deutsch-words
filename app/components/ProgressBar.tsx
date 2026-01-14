interface ProgressBarProps {
  current: number;
  total: number;
  colorFrom?: string;
  colorTo?: string;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  height?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function ProgressBar({
  current,
  total,
  colorFrom = "from-blue-500",
  colorTo = "to-purple-600",
  showPercentage = false,
  showLabel = false,
  label,
  height = "md",
  animated = true,
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  const heightClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className="mb-6">
      {(showLabel || showPercentage) && (
        <div className="flex items-center justify-between mb-2 text-sm">
          {showLabel && label && (
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-gray-700 dark:text-gray-300 font-bold">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`relative w-full bg-gray-200 dark:bg-gray-700 rounded-full ${heightClasses[height]} shadow-inner overflow-hidden`}>
        <div
          className={`bg-gradient-to-r ${colorFrom} ${colorTo} ${heightClasses[height]} rounded-full transition-all ${
            animated ? "duration-500" : "duration-200"
          } ease-out relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          {animated && percentage > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          )}
        </div>
      </div>
      {showPercentage && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-500 text-right">
          {current} / {total}
        </div>
      )}
    </div>
  );
}
