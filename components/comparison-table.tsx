import { comparisonRows } from "@/data/comparison";
import { CheckIcon } from "@/components/icons";

function Cell({ value }: { value: string }) {
  if (value === "Sim") {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-brand-light">
        <CheckIcon className="h-3.5 w-3.5 shrink-0" />
        Sim
      </span>
    );
  }
  if (value === "—") {
    return (
      <span className="text-slate-600" aria-label="Não incluído">
        —
      </span>
    );
  }
  return <span>{value}</span>;
}

/**
 * Tabela comparativa com rolagem horizontal acessível (region + tabIndex)
 * e coluna "Recurso" fixa à esquerda, para não ficar espremida no mobile.
 */
export function ComparisonTable() {
  return (
    <div
      role="region"
      aria-label="Tabela comparativa dos planos. Arraste para o lado para ver todas as colunas."
      tabIndex={0}
      className="overflow-x-auto rounded-2xl border border-slate-800 scrollbar-hide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <table className="w-full min-w-[640px] border-collapse text-left text-xs sm:text-sm">
        <thead>
          <tr className="bg-slate-900">
            <th
              scope="col"
              className="sticky left-0 z-10 bg-slate-900 p-3 font-semibold text-slate-300 sm:p-4"
            >
              Recurso
            </th>
            <th scope="col" className="p-3 font-semibold text-white sm:p-4">
              Essencial
            </th>
            <th scope="col" className="p-3 font-semibold text-brand-light sm:p-4">
              Profissional
            </th>
            <th scope="col" className="p-3 font-semibold text-white sm:p-4">
              Sob Medida
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {comparisonRows.map((row) => (
            <tr key={row.feature} className="odd:bg-slate-950 even:bg-slate-900/40">
              <th scope="row" className="sticky left-0 z-10 bg-inherit p-3 font-medium text-slate-300 sm:p-4">
                {row.feature}
              </th>
              <td className="p-3 text-slate-400 sm:p-4">
                <Cell value={row.essencial} />
              </td>
              <td className="p-3 text-slate-400 sm:p-4">
                <Cell value={row.profissional} />
              </td>
              <td className="p-3 text-slate-400 sm:p-4">
                <Cell value={row.sobMedida} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
