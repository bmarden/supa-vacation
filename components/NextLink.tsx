
import { forwardRef } from "react";
import Link from 'next/link';


interface NextLinkProps {
  href: string;
  children: React.ReactNode;
  className: string;
}
const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});
NextLink.displayName = 'CustomLink';

export default NextLink;