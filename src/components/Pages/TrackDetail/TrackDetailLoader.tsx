import Loader from '@/components/Shared/Material/Loader';
import ArtistInfoLoader from '@/components/Shared/Sections/ArtistInfo/ArtistInfoLoader';

export default function TrackDetailLoader({ hasArtist }: { hasArtist?: boolean }) {
  return (
    <div className="w-full max-h-full overflow-auto pb-20">
      <div className="p-6 relative">
        <div className="absolute md:right-5 right-8 md:top-5 top-8 z-9">
          <div className="skeleton-animation w-10 h-5"></div>
        </div>
        <div className="absolute right-5 bottom-6">
          <div className="skeleton-animation w-10 h-10"></div>
        </div>
        <div className="flex flex-wrap items-end gap-5">
          <div className="relative skeleton-animation md:w-70 md:h-70 w-full aspect-square"></div>
          <div className="pr-15 mt-3 text-text-color">
            <div className="md:text-2xl w-60 h-10 skeleton-animation"></div>
            <div className="w-80 h-10 mt-1 skeleton-animation"></div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-background-secondary">
        {hasArtist ? (
          <ArtistInfoLoader />
        ) : (
          <div className="p-5 flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
