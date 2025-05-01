import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import React from 'react';

import TradingListSkeleton from '@/components/Pages/Explore/skeleton';

interface Props {
  children: ReactNode[];
  loadingComponent: React.ReactNode;
}

// TO DO - recalculate on screen resize (and copy function to portfolio carousel)

export default function Carousel({ children, loadingComponent }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  const isRendered = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(550);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [scrolledPercent, setScrolledPercent] = useState(0);

  const calcSize = () => {
    const container = containerRef.current;
    if (!container || !children.length) return;

    const totalWidth = Array.from(container.children).reduce((acc, child) => {
      const el = child as HTMLElement;
      return acc + el.offsetWidth;
    }, 0);
    setWidth(totalWidth);

    if (container.children[1]) {
      setHeight(container.children[1].clientHeight);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      calcSize();
      isRendered.current = true;
    }, 50);
  });

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollLeft = currentScroll;
      const scrollLeft = currentScroll;
      const maxScrollLeft =
        scrollableContainerRef.current.scrollWidth - scrollableContainerRef.current.clientWidth;

      const newPercent = (scrollLeft / maxScrollLeft) * 100;
      setScrolledPercent(newPercent);
    }
  }, [currentScroll, containerRef]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setCurrentScroll((e.target as HTMLDivElement).scrollLeft);
    }, 200);
  };

  const onClickRight = () => {
    setCurrentScroll(currentScroll + 400);
  };

  const onClickLeft = () => {
    setCurrentScroll(currentScroll - 400);
  };

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        calcSize();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const disabledLeft = currentScroll <= 0;
  const disabledRight = scrolledPercent > 95;
  return (
    <div className="relative overflow-y-hidden z-1">
      {!disabledLeft && (
        <button
          onClick={onClickLeft}
          className="w-8 h-8 absolute opacity-60 hover:opacity-100 left-0 top-2/5 z-99 cursor-pointer rounded-sm flex items-center justify-center bg-background"
        >
          <div className="w-0 h-0 border-8 border-solid border-transparent border-r-black dark:invert mr-3"></div>
        </button>
      )}
      {isRendered.current && (
        <div
          style={{ height: `${height}px` }}
          className={`transition bg-black gradient-left w-5 z-9 left-0 absolute ${disabledLeft ? 'opacity-0' : 'opacity-100'}`}
        ></div>
      )}
      {!isRendered.current && <div>{loadingComponent}</div>}
      <div
        ref={scrollableContainerRef}
        style={{
          height: `${isRendered.current ? height : 0}px`,
          top: `calc(50% - ${height / 2}px)`,
        }}
        onScroll={onScroll}
        className="overflow-y-hidden scroll-smooth scroll-hidden"
      >
        <div
          ref={containerRef}
          className={`flex flex-wrap ${!isRendered.current && 'opacity-0'}`}
          style={{ width: `${width}px` }}
        >
          {children}
        </div>
      </div>
      {isRendered.current && (
        <div
          style={{ height: `${height}px`, top: `calc(50% - ${height / 2}px)` }}
          className={`transition bg-black gradient-right w-5 z-9 right-0 absolute ${disabledRight ? 'opacity-0' : 'opacity-100'}`}
        ></div>
      )}
      {!disabledRight && (
        <button
          onClick={onClickRight}
          className="w-8 h-8 absolute opacity-60 hover:opacity-100 right-0 top-2/5 z-99 cursor-pointer rounded-sm flex items-center justify-center bg-background"
        >
          <div className="w-0 h-0 border-8 border-solid border-transparent border-l-black dark:invert ml-3"></div>
        </button>
      )}
    </div>
  );
}
