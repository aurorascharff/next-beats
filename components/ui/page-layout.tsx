import type { ReactNode } from 'react';

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="px-6 py-6 sm:px-8">
      <h1 className="mb-6 text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

export function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="px-6 py-6 sm:px-8">{children}</div>;
}
