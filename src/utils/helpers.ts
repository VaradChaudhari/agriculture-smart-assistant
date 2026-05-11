import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + 'Cr';
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + 'L';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return formatDate(date);
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'low':
      return 'text-green-500 bg-green-100';
    case 'medium':
      return 'text-yellow-500 bg-yellow-100';
    case 'high':
      return 'text-orange-500 bg-orange-100';
    case 'critical':
      return 'text-red-500 bg-red-100';
    default:
      return 'text-gray-500 bg-gray-100';
  }
}

export function getReminderTypeColor(type: string): string {
  switch (type) {
    case 'watering':
      return 'text-blue-500 bg-blue-100 border-blue-200';
    case 'fertilizer':
      return 'text-emerald-500 bg-emerald-100 border-emerald-200';
    case 'pesticide':
      return 'text-red-500 bg-red-100 border-red-200';
    case 'harvesting':
      return 'text-amber-500 bg-amber-100 border-amber-200';
    case 'irrigation':
      return 'text-cyan-500 bg-cyan-100 border-cyan-200';
    default:
      return 'text-gray-500 bg-gray-100 border-gray-200';
  }
}

export function getReminderTypeIcon(type: string): string {
  switch (type) {
    case 'watering':
      return 'Droplets';
    case 'fertilizer':
      return 'Leaf';
    case 'pesticide':
      return 'Bug';
    case 'harvesting':
      return 'Wheat';
    case 'irrigation':
      return 'Waves';
    default:
      return 'Bell';
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
