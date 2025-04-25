import React from 'react';

import MusicPlayer from '@/components/Explore/MusicPlayer';
import SideBar from '@/components/Explore/SideBar';
import MobileMenu from '@/components/Shared/MobileMenu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <div className="flex main-container bg-background">
        <div className="md:w-[320px]">
          <SideBar />
        </div>
        <div className="min-w-100 explore-container">{children}</div>
      </div>
      <div>
        <MobileMenu />
        <MusicPlayer />
      </div>
    </div>
  );
}
