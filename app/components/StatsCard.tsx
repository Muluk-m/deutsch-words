interface StatsCardProps {
  value: number | string;
  label: string;
  color?: "blue" | "green" | "purple" | "red" | "orange" | "indigo";
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatsCard({ 
  value, 
  label, 
  color = "blue", 
  icon,
  subtitle,
  trend,
  className = ""
}: StatsCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-pink-600",
    orange: "from-orange-500 to-amber-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  const badgeClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    red: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    orange: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    indigo: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  };

  return (
    <div className={`card-gradient p-5 text-center transform hover:scale-105 transition-all ${className}`}>
      {icon && (
        <div className="flex justify-center mb-2">
          {icon}
        </div>
      )}
      <div className={`text-4xl font-extrabold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
        {label}
      </div>
      {subtitle && (
        <div className="mt-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClasses[color]}`}>
            {subtitle}
          </span>
        </div>
      )}
      {trend && (
        <div className="mt-2 flex items-center justify-center gap-1">
          {trend === "up" && (
            <>
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs text-green-600 dark:text-green-400">上升</span>
            </>
          )}
          {trend === "down" && (
            <>
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs text-red-600 dark:text-red-400">下降</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
