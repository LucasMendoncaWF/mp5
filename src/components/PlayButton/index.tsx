'use client';
import { useState } from 'react';
import './PlayButton.scss';

interface Props {
  width?: number;
  onClick: () => void;
}

export default function PlayButton({ width = 30, onClick }: Props) {
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
        <div
          style={{
            borderWidth: parseValueToPx(width / 3.4),
            borderLeftWidth: parseValueToPx(width / 2.4),
            borderRightWidth: 0,
            left: `calc(50% - ${parseValueToPx(width / 7)})`,
            top: `calc(50% - ${parseValueToPx(width / 4.1)})`,
          }}
          className="play-button__icon"
        ></div>
      </button>
    </div>
  );
}
