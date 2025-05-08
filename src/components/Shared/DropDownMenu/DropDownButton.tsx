import React from 'react';

export default function DropDownButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-full text-xs dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
    >
      {children}
    </button>
  );
}
