import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ as: Tag = "section", className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as any}
        className={cn("mx-auto w-full max-w-5xl px-4", className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
Section.displayName = "Section";

export { Section };
