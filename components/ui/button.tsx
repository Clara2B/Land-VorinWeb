import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand/90",
        // text-brand (#1E40FF) sobre os fundos escuros do site cai para ~2.75:1
        // de contraste — abaixo do mínimo AA (4.5:1). text-brand-light já é a
        // cor usada nos ícones/checks sobre fundo escuro em todo o site e
        // passa em 4.9:1+, então reaproveitamos ela aqui em vez de criar um
        // tom novo.
        outline: "border-2 border-brand text-brand-light hover:bg-brand/10",
        ghost: "text-brand-light hover:bg-brand/10",
        // #25D366 (verde "oficial" do WhatsApp) com texto branco por cima dá
        // só ~1.98:1 de contraste — bem abaixo do mínimo. Um verde um pouco
        // mais escuro mantém a identidade visual do WhatsApp e passa em 5.4:1.
        whatsapp: "bg-[#0F7A40] text-white hover:bg-[#0F7A40]/90",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
