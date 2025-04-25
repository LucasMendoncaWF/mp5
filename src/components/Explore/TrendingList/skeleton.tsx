export default function TradingListSkeleton() {
  return (
    <div className="max-w-full w-full py-8 overflow-hidden">
      <div className="flex w-800 ">
        {[...Array(5)]
          .map((_, index) => index + 1)
          .map((i) => (
            <div
              key={i}
              className="skeleton-animation md:mx-6 mx-4 md:w-70 md:h-70 w-40 h-40"
            ></div>
          ))}
      </div>
    </div>
  );
}
