import React from 'react';

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[100%] py-[5dvh] normal-case dark:text-amber-600 text-red-400 text-center flex justify-center">
      <div className="p-5 md:px-8 max-w-[300px] font-bold bg-stone-100 dark:bg-stone-700 rounded-xl">
        {children}
      </div>
    </div>
  );
}
