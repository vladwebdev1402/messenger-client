import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

import { useLayout } from './useLayout';
import { ChatList } from './components';

const Layout = () => {
  const { isOpen, changeIsOpen } = useLayout();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={clsx('w-full border-r-2 border-r-border transition-all', {
          'max-w-full sm:max-w-[320px]': isOpen,
          'max-w-0 sm:max-w-[80px]': !isOpen,
        })}
      >
        <ChatList isLayoutOpen={isOpen} changeIsOpenLayout={changeIsOpen} />
      </aside>
      <main
        className={clsx('w-full relative sm:opacity-100', {
          'max-w-0 -z-10 opacity-0 sm:max-w-full sm:z-0': isOpen,
        })}
      >
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
