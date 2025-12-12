import { type FC, type ReactNode } from 'react';
import { Button as ShadButton, type buttonVariants } from '../../components/ui/Button';
import type { VariantProps } from 'class-variance-authority';

export interface MastUIButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: ReactNode;
  asChild?: boolean;
}

export const Button: FC<MastUIButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className,
  asChild = false,
  ...props
}) => {
  return (
    <ShadButton variant={variant} size={size} asChild={asChild} className={className} {...props}>
      {children}
    </ShadButton>
  );
};
