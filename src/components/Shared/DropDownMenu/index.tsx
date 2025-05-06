import React from 'react';

interface Props {
  // eslint-disable-next-line no-unused-vars
  setMenuOpen: (value: boolean) => void;
  isMenuOpen: boolean;
  children: React.ReactNode;
  size?: number;
  hasBorder?: boolean;
  direction?: 'top' | 'bottom';
  gap?: number;
}

export default function DropDownMenu({
  size = 1,
  setMenuOpen,
  hasBorder,
  isMenuOpen,
  children,
  gap = 2,
  direction = 'top',
}: Props) {
  const sizeMeasure = 5;
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(!isMenuOpen);
        }}
        aria-label="Open menu"
        style={{ gap: `${gap}px`, padding: `${size * 5}px` }}
        className={`flex cursor-pointer transition hover:opacity-70`}
      >
        <div
          style={{
            width: `${size * sizeMeasure}px`,
            height: `${size * sizeMeasure}px`,
            borderWidth: hasBorder ? size / 4 : 0,
          }}
          className={`rounded-full bg-text-color border-background`}
        ></div>
        <div
          style={{
            width: `${size * sizeMeasure}px`,
            height: `${size * sizeMeasure}px`,
            borderWidth: hasBorder ? size / 4 : 0,
          }}
          className={`rounded-full bg-text-color border-background`}
        ></div>
        <div
          style={{
            width: `${size * sizeMeasure}px`,
            height: `${size * sizeMeasure}px`,
            borderWidth: hasBorder ? size / 4 : 0,
          }}
          className={`rounded-full bg-text-color border-background`}
        ></div>
      </button>
      {isMenuOpen && (
        <div
          style={{
            top: direction === 'bottom' ? '100%' : 'unset',
            bottom: direction === 'top' ? '100%' : 'unset',
          }}
          className="drop-shadow-modal bg-text-color w-40 z-9 rounded-md rounded-200 z-9999 right-0 absolute"
        >
          {children}
          {direction === 'top' ? (
            <div className="absolute text-text-color bottom-[-12px] right-1 z-[-1]">▼</div>
          ) : (
            <div className="absolute text-text-color top-[-12px] right-1 z-[-1]">▲</div>
          )}
        </div>
      )}
    </div>
  );
}
