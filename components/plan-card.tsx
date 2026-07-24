import type { Plan } from "@/data/plans";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { TrackingEventName } from "@/lib/tracking";

const PLAN_EVENT: Record<Plan["id"], TrackingEventName> = {
  essencial: "select_essential_plan",
  profissional: "select_professional_plan",
  "sob-medida": "request_custom_project",
};

interface PlanCardProps {
  plan: Plan;
  className?: string;
}

export function PlanCard({ plan, className }: PlanCardProps) {
  const featured = Boolean(plan.highlightLabel);
  const whatsappHref = buildWhatsappLink({
    message: plan.whatsappMessage,
    origin: "PLANOS",
    plan: plan.name,
  });

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-slate-900 p-4 sm:p-5",
        featured
          ? "card-glow-featured border-brand ring-1 ring-brand"
          : "card-glow-side border-slate-800",
        className,
      )}
    >
      {featured && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          {plan.highlightLabel}
        </span>
      )}

      <h3 className="text-base font-bold text-white sm:text-lg">{plan.name}</h3>
      <p className="mt-0.5 text-2xl font-extrabold text-brand-light sm:text-3xl">{plan.priceLabel}</p>
      <p className="mt-1 text-xs leading-snug text-slate-300 sm:text-sm">{plan.tagline}</p>

      <div className="mt-3 flex flex-1 flex-col">
        {plan.features.length > 0 && (
          <ul className="mb-2 space-y-1">
            {plan.features.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-[11px] leading-snug text-slate-400 sm:text-xs">
                <CheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-brand-light" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {plan.examples && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {plan.examples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-slate-700 bg-slate-800/60 px-2 py-1 text-[10px] font-medium text-slate-300 sm:text-[11px]"
              >
                {example}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          {plan.deadlineNote && (
            <p className="mb-2 text-[10px] leading-snug text-slate-500">{plan.deadlineNote}</p>
          )}

          <TrackedLink
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            event={PLAN_EVENT[plan.id]}
            eventPayload={{
              plan_name: plan.name,
              ...(plan.priceValue !== null ? { plan_value: plan.priceValue } : {}),
            }}
            className={buttonVariants({ variant: "whatsapp", size: "default", className: "w-full" })}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {plan.ctaLabel}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
