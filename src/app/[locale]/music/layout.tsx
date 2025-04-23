import React from 'react';

import SideBar from '@/components/SideBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-10">
      <SideBar />
      {children}
    </div>
  );
}
