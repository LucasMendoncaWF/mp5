import React from 'react';

import MobileMenu from '@/components/Shared/MobileMenu';
import MusicPlayer from '@/components/Shared/MusicPlayer';
import SideBar from '@/components/Shared/SideBar';

import './MainLayout.scss';

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
        <div className="md:min-w-100 content-container inner-shadow">{children}</div>
      </div>
      <div>
        <MobileMenu />
        <MusicPlayer />
      </div>
    </div>
  );
}
