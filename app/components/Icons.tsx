// 图标组件统一管理
import {
  Home,
  BookOpen,
  RefreshCw,
  CheckCircle,
  XCircle,
  Volume2,
  Search,
  ChevronLeft,
  ChevronRight,
  Trophy,
  TrendingUp,
  BookMarked,
  Clock,
  Target,
  AlertCircle,
  Settings,
  Zap,
  Award,
  BarChart3,
  Calendar,
  FileText,
  ListChecks,
  Repeat,
  RotateCcw,
  Play,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Eye,
  EyeOff,
  Globe,
  Sparkles,
  Library,
  GraduationCap,
  Brain,
  Lightbulb,
  MessageSquare,
  Mic,
  Headphones,
  PenTool,
  Edit,
  Trash2,
  Plus,
  Minus,
  Info,
  HelpCircle,
} from 'lucide-react';

// 统一的图标大小配置
export const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
} as const;

// 导出所有图标
export {
  Home,
  BookOpen,
  RefreshCw,
  CheckCircle,
  XCircle,
  Volume2,
  Search,
  ChevronLeft,
  ChevronRight,
  Trophy,
  TrendingUp,
  BookMarked,
  Clock,
  Target,
  AlertCircle,
  Settings,
  Zap,
  Award,
  BarChart3,
  Calendar,
  FileText,
  ListChecks,
  Repeat,
  RotateCcw,
  Play,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Eye,
  EyeOff,
  Globe,
  Sparkles,
  Library,
  GraduationCap,
  Brain,
  Lightbulb,
  MessageSquare,
  Mic,
  Headphones,
  PenTool,
  Edit,
  Trash2,
  Plus,
  Minus,
  Info,
  HelpCircle,
};

// 图标容器组件 - 提供统一的图标包装
interface IconWrapperProps {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  size?: keyof typeof iconSizes;
}

export function IconWrapper({ 
  icon: Icon, 
  className = '', 
  size = 'md' 
}: IconWrapperProps) {
  return <Icon className={`${iconSizes[size]} ${className}`} />;
}

