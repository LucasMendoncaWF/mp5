'use client';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';

interface Props {
  // eslint-disable-next-line no-unused-vars
  setVolume: (vol: number) => void;
  volume: number;
}

export default function VolumeControl({ setVolume, volume }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateVolume = useCallback(
    (clientX: number) => {
      const bar = barRef.current;
      if (!bar) return;

      const rect = bar.getBoundingClientRect();
      const x = clientX - rect.left;
      const newVolume = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setVolume(newVolume);
    },
    [setVolume],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) updateVolume(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) updateVolume(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, updateVolume]);

  return (
    <div className="flex items-center gap-2 w-full justify-start select-none">
      <Image
        className="dark:invert"
        width="15"
        height="15"
        alt="volume icon"
        src="/images/volume.png"
      />
      <div
        ref={barRef}
        onTouchStart={(e) => {
          setIsDragging(true);
          updateVolume(e.touches[0].clientX);
        }}
        onMouseDown={(e) => {
          setIsDragging(true);
          updateVolume(e.clientX);
        }}
        className="relative h-1 flex-1 rounded-full bg-primary cursor-pointer"
      >
        <div
          className="absolute h-full bg-text-color rounded-full"
          style={{ width: `${volume}%` }}
        />
        <div
          onMouseDown={() => setIsDragging(true)}
          style={{ left: `${volume}%` }}
          className={`h-[10px] w-[10px] bottom-[-3px] rounded-full border-2 border-text-color bg-background absolute z-10 transition transform -translate-x-1/2 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        />
      </div>
    </div>
  );
}
