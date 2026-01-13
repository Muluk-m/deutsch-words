import { Link } from "react-router";

interface BackButtonProps {
  to?: string;
}

export function BackButton({ to = "/" }: BackButtonProps) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>返回</span>
    </Link>
  );
}
