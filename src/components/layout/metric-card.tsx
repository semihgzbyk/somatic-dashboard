import { ReactNode } from 'react';

type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string; // Opsiyonel hale getirdik
  icon?: ReactNode;   // Görsellik için ikon desteği ekledik
  trend?: {
    label: string;
    isPositive: boolean;
  };
};

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: MetricCardProps) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 antialiased">{title}</p>
        {icon && <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">{icon}</div>}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </h3>
        {trend && (
          <span className={`text-xs font-semibold ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.label}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs leading-relaxed text-slate-500/80">
          {subtitle}
        </p>
      )}
    </div>
  );
}