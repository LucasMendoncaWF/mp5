import Image from 'next/image';

export default function SearchField() {
  return (
    <div className="relative md:w-100">
      <input
        type="text"
        maxLength={150}
        className="text-[13px] w-full text-text-color px-5 py-2 pr-10 border-2 border-text-color rounded-full"
      />
      <Image
        className="dark:invert absolute right-5 top-[13px]"
        width="15"
        height="15"
        alt="search icon"
        src="/images/search-icon.png"
      />
    </div>
  );
}
