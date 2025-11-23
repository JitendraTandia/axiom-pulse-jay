import React from 'react';
import { 
  Globe, 
  Twitter, 
  Send, 
  Shield, 
  Lock, 
  Copy, 
  Search,
  Settings,
  Menu,
  Bell,
  Wallet,
  Star,
  LayoutGrid,
  Filter,
  Zap,
  Clock,
  ChevronDown,
  Users,
  Box,
  Rocket,
  AlertTriangle,
  ChefHat,
  Pill,
  Ghost,
  Crosshair,
  EyeOff,
  Flame
} from 'lucide-react';

interface IconProps {
  className?: string;
  size?: number;
  fill?: string;
}

export const Icons = {
  Website: ({ className, size = 14, fill }: IconProps) => <Globe className={className} size={size} fill={fill} />,
  Twitter: ({ className, size = 14, fill }: IconProps) => <Twitter className={className} size={size} fill={fill} />,
  Telegram: ({ className, size = 14, fill }: IconProps) => <Send className={className} size={size} fill={fill} />, 
  Audit: ({ className, size = 14, fill }: IconProps) => <Shield className={className} size={size} fill={fill} />,
  Shield: ({ className, size = 14, fill }: IconProps) => <Shield className={className} size={size} fill={fill} />,
  Lock: ({ className, size = 14, fill }: IconProps) => <Lock className={className} size={size} fill={fill} />,
  Copy: ({ className, size = 12, fill }: IconProps) => <Copy className={className} size={size} fill={fill} />,
  Search: ({ className, size = 16, fill }: IconProps) => <Search className={className} size={size} fill={fill} />,
  Settings: ({ className, size = 16, fill }: IconProps) => <Settings className={className} size={size} fill={fill} />,
  Menu: ({ className, size = 20, fill }: IconProps) => <Menu className={className} size={size} fill={fill} />,
  Bell: ({ className, size = 18, fill }: IconProps) => <Bell className={className} size={size} fill={fill} />,
  Wallet: ({ className, size = 18, fill }: IconProps) => <Wallet className={className} size={size} fill={fill} />,
  Star: ({ className, size = 18, fill }: IconProps) => <Star className={className} size={size} fill={fill} />,
  Grid: ({ className, size = 18, fill }: IconProps) => <LayoutGrid className={className} size={size} fill={fill} />,
  Filter: ({ className, size = 14, fill }: IconProps) => <Filter className={className} size={size} fill={fill} />,
  Zap: ({ className, size = 14, fill }: IconProps) => <Zap className={className} size={size} fill={fill} />,
  Clock: ({ className, size = 12, fill }: IconProps) => <Clock className={className} size={size} fill={fill} />,
  ChevronDown: ({ className, size = 14, fill }: IconProps) => <ChevronDown className={className} size={size} fill={fill} />,
  Users: ({ className, size = 12, fill }: IconProps) => <Users className={className} size={size} fill={fill} />,
  Box: ({ className, size = 12, fill }: IconProps) => <Box className={className} size={size} fill={fill} />,
  Rocket: ({ className, size = 12, fill }: IconProps) => <Rocket className={className} size={size} fill={fill} />,
  Alert: ({ className, size = 12, fill }: IconProps) => <AlertTriangle className={className} size={size} fill={fill} />,
  ChefHat: ({ className, size = 12, fill }: IconProps) => <ChefHat className={className} size={size} fill={fill} />,
  Pill: ({ className, size = 12, fill }: IconProps) => <Pill className={className} size={size} fill={fill} />,
  Ghost: ({ className, size = 12, fill }: IconProps) => <Ghost className={className} size={size} fill={fill} />,
  Target: ({ className, size = 12, fill }: IconProps) => <Crosshair className={className} size={size} fill={fill} />,
  EyeOff: ({ className, size = 12, fill }: IconProps) => <EyeOff className={className} size={size} fill={fill} />,
  Flame: ({ className, size = 12, fill }: IconProps) => <Flame className={className} size={size} fill={fill} />,
  
  // Custom Sol Logo
  Solana: ({ className, size=12 }: { className?: string, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 397 311" className={className} fill="currentColor">
       <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm263.5-129.5c-2.4 2.4-5.7 3.8-9.2 3.8H1.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7zM64.6 34.3c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 34.3z"/>
    </svg>
  )
};