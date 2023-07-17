import type { ReactNode } from 'react';
import { useWindow } from '@lib/context/window-context';
import { SearchBar } from '@components/aside/search-bar';
import { AsideFooter } from '@components/aside/aside-footer';

type AsideProps = {
  children: ReactNode;
};

export function Aside({ children }: AsideProps): JSX.Element | null {
  const { width } = useWindow();

  if (width < 1024) {
    return null;
  }

  return (
    <aside className='flex w-96 flex-col gap-4 px-4 py-3 pt-1'>
      <SearchBar />
      {children}
      <AsideFooter />
    </aside>
  );
}
