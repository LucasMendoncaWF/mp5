import React from 'react';

import MobileMenu from '@/components/MobileMenu';
import MusicPlayer from '@/components/MusicPlayer';
import SideBar from '@/components/SideBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <div className="flex main-container bg-background">
        <SideBar />
        {children}
      </div>
      <div>
        <MobileMenu />
        <MusicPlayer />
      </div>
    </div>
  );
}
