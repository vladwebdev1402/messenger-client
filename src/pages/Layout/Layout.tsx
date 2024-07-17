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
