'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import routes from '@/app/routes';
import './GenreItemThumb.scss';

export default function GenreItemThumb({ title }: { title: string }) {
  const textRef = useRef<SVGTextElement>(null);
  const divRepetitionRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [repetitions, setRepetition] = useState(1);
  const [spaceBetween, setSpaceBetween] = useState(1);
  const [viewBoxCalculated, setViewBoxCalculated] = useState(false);
  const [viewBox, setViewBox] = useState('0 0 1000 300');

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement || !title) return;

    const resize = () => {
      setTimeout(async () => {
        const textLength = textElement.getComputedTextLength();
        const padding = 25;
        const newViewBox = `0 0 ${textLength + padding * 2} ${textElement.getBoundingClientRect().height + padding * 2}`;
        setViewBox(newViewBox);
        setViewBoxCalculated(true);
      }, 2000);
    };

    resize();
  }, [title]);

  useEffect(() => {
    setTimeout(() => {
      if (
        !divRepetitionRef.current?.clientHeight ||
        !divRef.current?.clientHeight ||
        !viewBoxCalculated
      ) {
        return;
      }
      const repetitions = Math.round(
        divRef.current?.clientHeight / divRepetitionRef.current?.clientHeight,
      );
      setRepetition(repetitions + 1);
      setSpaceBetween(
        (divRef.current?.clientHeight % divRepetitionRef.current?.clientHeight) / repetitions,
      );
    }, 400);
  }, [divRef, viewBoxCalculated]);

  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
    >
      <text
        ref={textRef}
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: 'Baliw', fontSize: 100 }}
      >
        {title}
      </text>
    </svg>
  );

  return (
    <div className="py-2 md:px-4 px-2">
      <Link aria-label="Search by genre" href={`${routes.search}?genre=${title}`}>
        <div
          ref={divRef}
          className={`${viewBoxCalculated ? '' : 'genre-item-thumb--loading'} genre-item-thumb link-hover relative overflow-hidden md:w-70 md:h-70 w-50 h-50 bg-secondary`}
        >
          <div>
            {[...new Array(repetitions)].map((_, index) => (
              <div
                ref={divRepetitionRef}
                className={repetitions > 1 ? 'opacity-60' : 'opacity-0'}
                key={index}
                style={{ marginBottom: `-${spaceBetween / 1.5}px` }}
              >
                {svg}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
