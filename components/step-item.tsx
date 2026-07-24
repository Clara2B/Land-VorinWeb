interface StepItemProps {
  number: number;
  title: string;
}

export function StepItem({ number, title }: StepItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3 sm:p-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
        {number}
      </span>
      <p className="text-xs font-medium leading-snug text-slate-200 sm:text-sm">{title}</p>
    </li>
  );
}
