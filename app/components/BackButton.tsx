import { Link } from "react-router";

interface BackButtonProps {
  to?: string;
  label?: string;
}

export function BackButton({ to = "/", label = "返回" }: BackButtonProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-4 py-2 
        text-gray-600 dark:text-gray-400 
        hover:text-gray-900 dark:hover:text-gray-100
        bg-white dark:bg-gray-800 
        hover:bg-gray-50 dark:hover:bg-gray-700
        rounded-xl shadow-md hover:shadow-lg
        transition-all duration-200
        font-medium
        active:scale-95"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>{label}</span>
    </Link>
  );
}
