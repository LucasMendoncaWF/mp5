'use client';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React from 'react';

const MusicPlayer = dynamic(() => import('@/components/PageStructure/MusicPlayer'));
const SideBar = dynamic(() => import('@/components/PageStructure/SideBar'));
const MobileMenu = dynamic(() => import('@/components/PageStructure/MobileMenu'));

export default function PlayerWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hidePlayer = pathname.includes('settings') || pathname.includes('profile');

  return (
    <>
      <div className={`flex bg-background ${!hidePlayer ? 'main-container' : 'w-full'}`}>
        <div className={`${hidePlayer ? 'w-0 h-0 overflow-hidden' : 'md:w-[320px] '}`}>
          <SideBar />
        </div>
        <div
          className={`md:min-w-100  ${!hidePlayer ? 'content-container inner-shadow' : 'w-full bg-background-secondary'}`}
        >
          {children}
        </div>
      </div>
      <div className={`${hidePlayer ? 'w-0 h-0 overflow-hidden' : ''}`}>
        <MobileMenu />
        <MusicPlayer />
      </div>
    </>
  );
}
