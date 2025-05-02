export default function PlayListSkeleton() {
  const playlistSkeletonItem = (
    <div className="w-full py-2 h-9 flex justify-between">
      <div className="w-6/8 h-full skeleton-animation"></div>
      <div className="w-1/8 h-full skeleton-animation"></div>
    </div>
  );
  return (
    <div className="w-full">
      {[...new Array(4)].map((_, index) => (
        <div key={index}>{playlistSkeletonItem}</div>
      ))}
    </div>
  );
}
