import { FC, ReactNode, useEffect, useRef } from 'react';

type Props = {
  isLoading: boolean;
  isStopScroll: boolean;
  className?: string;
  onObserve: () => void;
  loader: ReactNode;
};

const InfinityScroll: FC<Props> = ({
  isLoading,
  isStopScroll,
  className = '',
  loader,
  onObserve,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = observerRef.current;

    const options = {
      root: null,
      rootMargin: '10px',
      thresold: 1,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) onObserve();
    };

    const observer = new IntersectionObserver(callback, options);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [observerRef, onObserve]);

  return (
    <div className={className}>
      {isLoading && loader}
      {!isLoading && !isStopScroll && (
        <div ref={observerRef} className="w-full h-[100px]"></div>
      )}
    </div>
  );
};

export { InfinityScroll };
