import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

import { ChatList } from '@/components';

import { useLayout } from './useLayout';

const Layout = () => {
  const { isOpen, changeIsOpen } = useLayout();

  return (
    <div className="flex h-screen">
      <aside
        className={clsx('w-full border-r border-r-slate-200 transition-all', {
          'max-w-[320px]': isOpen,
          ' max-w-[80px]': !isOpen,
        })}
      >
        <ChatList isLayoutOpen={isOpen} changeIsOpenLayout={changeIsOpen} />
      </aside>

      <Outlet />
    </div>
  );
};

export { Layout };
