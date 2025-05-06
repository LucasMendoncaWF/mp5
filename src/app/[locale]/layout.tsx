'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React from 'react';

const DeletePlayListModal = dynamic(
  () => import('@/components/PageStructure/DeletePlayListModal'),
  { ssr: false },
);
const MusicPlayer = dynamic(() => import('@/components/PageStructure/MusicPlayer'), { ssr: false });
const SideBar = dynamic(() => import('@/components/PageStructure/SideBar'), { ssr: false });
const MobileMenu = dynamic(() => import('@/components/Shared/MobileMenu'));
import './MainLayout.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const hideFunctions = path.includes('profile') || path.includes('settings');
  return (
    <div className="h-full">
      <DeletePlayListModal />
      <div className={`flex bg-background ${!hideFunctions ? 'main-container' : 'w-full'}`}>
        <div className={`${hideFunctions ? 'w-0 h-0 overflow-hidden' : 'md:w-[320px] '}`}>
          <SideBar />
        </div>
        <div
          className={`md:min-w-100  ${!hideFunctions ? 'content-container inner-shadow' : 'w-full bg-background-secondary'}`}
        >
          {children}
        </div>
      </div>
      <div className={`${hideFunctions ? 'w-0 h-0 overflow-hidden' : ''}`}>
        <MobileMenu />
        <MusicPlayer />
      </div>
    </div>
  );
}
