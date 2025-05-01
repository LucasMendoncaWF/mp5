import { useCallback, useEffect, useRef, useState } from 'react';
interface Props {
  progressPercentage: number;
  // eslint-disable-next-line no-unused-vars
  setProgressPercentage: (n: number) => void;
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (value: boolean) => void;
}

export default function ProgressBar({
  progressPercentage,
  setProgressPercentage,
  setIsLoading,
}: Props) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const updateProgressByClientX = useCallback(
    (clientX: number) => {
      const bar = progressBarRef.current;
      if (!bar) return;

      const rect = bar.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setProgressPercentage(percentage);
      setIsLoading(true);
    },
    [setIsLoading, setProgressPercentage],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) updateProgressByClientX(e.clientX);
    },
    [isDragging, updateProgressByClientX],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) updateProgressByClientX(e.touches[0].clientX);
    },
    [isDragging, updateProgressByClientX],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
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
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="w-full flex gap-3 items-center relative justify-center mt-2 md:mt-4">
      <div
        ref={progressBarRef}
        className="music-player__progress-bar relative w-[60%] h-[6px] bg-gray-600 rounded cursor-pointer"
        onMouseDown={(e) => {
          updateProgressByClientX(e.clientX);
          setIsDragging(true);
        }}
        onTouchStart={(e) => {
          updateProgressByClientX(e.touches[0].clientX);
          setIsDragging(true);
        }}
      >
        <div className="h-full bg-primary rounded" style={{ width: `${progressPercentage}%` }} />
        <div
          onTouchStart={() => setIsDragging(true)}
          onMouseDown={() => setIsDragging(true)}
          style={{ left: `${progressPercentage - 0.5}%` }}
          className={`h-4 w-4 bottom-[-4px] rounded-full border-2 border-text-color bg-background absolute z-10 transition hover:opacity-80 hover:scale-109 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        ></div>
      </div>
    </div>
  );
}
