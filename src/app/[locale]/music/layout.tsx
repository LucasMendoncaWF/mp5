import React from 'react';

import SideBar from '@/components/SideBar';
import MusicPlayer from '@/components/MusicPlayer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <div className='flex main-container bg-background'>
        <SideBar />
        {children}
      </div>
      <div>
        <MusicPlayer />
      </div>
    </div>
  );
}
