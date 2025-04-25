'use client';
import TrendingList from '@/components/Explore/TrendingList';

export default function ExplorePage() {
  return (
    <div className="w-full pb-4 md:pt-4 max-h-full overflow-auto md:px-8 px-3">
      <TrendingList />
    </div>
  );
}
