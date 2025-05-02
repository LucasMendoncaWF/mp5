import React from 'react';

import DeletePlayListModal from '@/components/PageStructure/DeletePlayListModal';
import MusicPlayer from '@/components/PageStructure/MusicPlayer';
import SideBar from '@/components/PageStructure/SideBar';
import MobileMenu from '@/components/Shared/MobileMenu';
import './MainLayout.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <DeletePlayListModal />
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
