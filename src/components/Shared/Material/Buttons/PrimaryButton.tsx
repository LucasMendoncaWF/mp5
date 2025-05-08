import React from 'react';

export default function PrimaryButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 cursor-pointer px-4 font-bold rounded-xl bg-primary text-white hover:opacity-80 transition"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
