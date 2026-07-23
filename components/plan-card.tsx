import * as React from "react";

import { cn } from "@/lib/utils";

export interface PlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  price?: string;
  description: string;
  featured?: boolean;
  badge?: string;
}

const PlanCard = React.forwardRef<HTMLDivElement, PlanCardProps>(
  ({ title, price, description, featured, badge, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col rounded-2xl border bg-slate-900 p-3.5 sm:p-4",
          featured
            ? "card-glow-featured border-brand ring-1 ring-brand"
            : "card-glow-side border-slate-800",
          className,
        )}
        {...props}
      >
        {featured && badge && (
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}

        <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>

        {price && (
          <p className="mt-0.5 text-2xl font-extrabold text-brand-light sm:text-3xl">{price}</p>
        )}

        <p className="mt-1 text-xs leading-snug text-slate-300 sm:text-sm">{description}</p>

        <div className="mt-1.5 flex flex-1 flex-col">{children}</div>
      </div>
    );
  },
);
PlanCard.displayName = "PlanCard";

export { PlanCard };
