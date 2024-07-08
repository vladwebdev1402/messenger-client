import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

const typographyVariants = {
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
};

type TypographyVariants = 'h2' | 'h3' | 'h4' | 'p';

type TypographyTags = 'h1' | 'h2' | 'h3' | 'div' | 'p' | 'span';

type TypographyProps<Tag extends TypographyTags> = ComponentProps<Tag> & {
  variant?: TypographyVariants;
  tag?: TypographyTags;
  children: ReactNode;
};

const Typography = <Tag extends TypographyTags = 'div'>({
  variant = 'p',
  tag: Tag = 'div',
  className = '',
  children,
}: TypographyProps<Tag>) => {
  return (
    <Tag className={clsx(typographyVariants[variant], className)}>
      {children}
    </Tag>
  );
};

export { Typography };
