export default function TrendingListSkeleton() {
  return (
    <div className="max-w-full w-full md:ml-0 ml-[-9px] py-2 overflow-hidden">
      <div className="flex w-800 ">
        {[...Array(5)]
          .map((_, index) => index + 1)
          .map((i) => (
            <div key={i} className="skeleton-animation mx-4 md:w-70 md:h-70 w-50 h-50"></div>
          ))}
      </div>
    </div>
  );
}
