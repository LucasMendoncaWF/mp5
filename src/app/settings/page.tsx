'use client';

import Subscriptions from '@/components/Shared/Sections/Subscriptions';

export default function SettingsPage() {
  // TODO
  return (
    <div className="relative w-full max-h-full md:px-6 overflow-auto flex flex-wrap justify-center">
      <div className="max-w-200 w-full py-10 md:bg-background drop-shadow-modal">
        <div className="p-6 rounded-3xl">
          <Subscriptions />
        </div>
      </div>
    </div>
  );
}
