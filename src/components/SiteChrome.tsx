import type { ReactNode } from 'react';

export type NavLink = {
  label: string;
  href: string;
  className?: string;
};

type SiteShellProps = {
  children: ReactNode;
  navLinks?: NavLink[];
};

const defaultNavLinks: NavLink[] = [
  { label: 'Wiki', href: '/wiki', className: 'nav-outline' },
  { label: 'Contact', href: '#contact', className: 'nav-cta' },
];

export function SiteShell({ children, navLinks = defaultNavLinks }: SiteShellProps) {
  return (
    <div className="site" id="top">
      <SiteHeader navLinks={navLinks} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

type SiteHeaderProps = {
  navLinks?: NavLink[];
};

function SiteHeader({ navLinks }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="site-logo" href="/">
        Ole Larsen
      </a>
      <nav className="site-nav">
        {navLinks?.map((link) => (
          <a key={link.href} className={link.className} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Ole Larsen. Independent designer &amp; builder.</p>
      <a href="#top">To top</a>
    </footer>
  );
}
