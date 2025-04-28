'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function VolumeControl() {
  const barRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateVolume = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const x = clientX - rect.left;
    const newVolume = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setVolume(newVolume);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) updateVolume(e.clientX);
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

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
