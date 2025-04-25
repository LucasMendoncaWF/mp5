'use client';
import { useState } from 'react';
import './PlayButton.scss';

interface Props {
  width?: number;
  onClick: () => void;
  isPaused?: boolean;
}

export default function PlayButton({ width = 30, onClick, isPaused = true }: Props) {
  const [buttonPressed, setButtonPressed] = useState(false);
  const parseValueToPx = (n: number) => `${n}px`;

  const onButtonClick = () => {
    onClick();
    if (!buttonPressed) {
      setButtonPressed(true);
      setTimeout(() => {
        setButtonPressed(false);
      }, 1000);
    }
  };

  return (
    <div
      style={{
        width: parseValueToPx(width),
        height: parseValueToPx(width),
      }}
      className="flex play-button relative flex-wrap justify-center content-center rounded-full"
    >
      <button
        onClick={onButtonClick}
        className={`play-button__element ${buttonPressed && 'pressed'} bg-primary cursor-pointer relative h-full w-full rounded-full transition duration-300 hover:opacity-80 hover:scale-92`}
      >
        {buttonPressed && <div className="play-button__notes-animation"></div>}
        {isPaused ? (
          <div
            style={{
              borderWidth: parseValueToPx(width / 3.4),
              borderLeftWidth: parseValueToPx(width / 2.4),
              borderRightWidth: 0,
              left: `calc(50% - ${parseValueToPx(width / 7)})`,
              top: `calc(50% - ${parseValueToPx(width / 3.9)})`,
            }}
            className="play-button__icon"
          ></div>
        ) : (
          <div className="flex justify-center w-full h-full items-center gap-[10%]">
            <div className="bg-background w-[16%] h-[50%]"></div>
            <div className="bg-background w-[16%] h-[50%]"></div>
          </div>
        )}
      </button>
    </div>
  );
}
