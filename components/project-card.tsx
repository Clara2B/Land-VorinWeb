import type { Case } from "@/data/cases";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";

interface ProjectCardProps {
  project: Case;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
      <div className="flex h-12 w-full items-center justify-center rounded-lg border border-slate-800 bg-white/95 px-3 sm:h-14">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.logo}
          alt={`Logo ${project.name}`}
          width={160}
          height={40}
          className="max-h-8 w-auto object-contain sm:max-h-10"
          loading="lazy"
        />
      </div>

      <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
        {project.serviceType}
      </span>

      <div>
        <p className="text-xs font-semibold text-slate-200">{project.name}</p>
        <p className="text-[10px] text-slate-500">{project.segment}</p>
      </div>

      <p className="text-[10px] leading-snug text-slate-500">{project.description}</p>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "ghost", size: "sm", className: "mt-1 gap-1" })}
      >
        Ver projeto
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
