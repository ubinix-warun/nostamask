import { forwardRef } from 'react';
import type { ComponentPropsWithRef } from 'react';
import Link from 'next/link';

type MenuLinkProps = ComponentPropsWithRef<'a'> & {
  href: string;
};

// eslint-disable-next-line react/display-name
export const MenuLink = forwardRef<HTMLAnchorElement, MenuLinkProps>(
  ({ href, children, ...rest }, ref) => (
    <Link href={href} legacyBehavior>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  )
);
