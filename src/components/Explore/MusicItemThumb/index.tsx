import type { TrackModel } from '@/models/tracks';

export default function MusicItemThumb({ track }: { track: TrackModel }) {
  return (
    <div className="py-2 md:px-6 px-4">
      <div className="text-text-color md:w-70 md:h-70 w-40 h-40 bg-primary">{track.title}</div>
    </div>
  );
}
