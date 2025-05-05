import Loader from '../Loader';

export default function ArtistInfoLoader({ hasMusics }: { hasMusics?: boolean }) {
  return (
    <div className="p-6">
      <div className="md:flex flex-wrap items-start gap-5">
        <div className="w-45 aspect-square rounded-full skeleton-animation"></div>
        <div className="mt-2">
          <div className="mb-1 w-20 h-8 skeleton-animation"></div>
          <div className="mb-1 w-50 h-8 skeleton-animation"> </div>
          <div className="md:block flex-wrap flex gap-3">
            <div className="w-24 h-5 md:mt-1 skeleton-animation"></div>
            <div className="w-23 md:w-24 h-5 md:mt-1 skeleton-animation"></div>
            <div className="w-80 h-10 md:mt-1 skeleton-animation"></div>
          </div>
        </div>
      </div>
      {hasMusics && (
        <div className="w-full flex justify-center py-50">
          <Loader />
        </div>
      )}
    </div>
  );
}
