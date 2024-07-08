import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ChatList } from '@/components';
import clsx from 'clsx';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const changeIsOpen = () => {
    setIsOpen(!isOpen);
  };

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
