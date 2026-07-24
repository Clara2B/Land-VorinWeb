import type { FaqItem } from "@/data/faq";
import { ChevronDownIcon } from "@/components/icons";

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * Usa <details>/<summary> nativo: acessível e navegável por teclado sem
 * nenhum JavaScript, com estado aberto/fechado exposto automaticamente
 * para leitores de tela.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900">
      {items.map((item) => (
        <details key={item.question} className="group p-4 sm:p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden sm:text-base">
            {item.question}
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-400 sm:text-sm">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
