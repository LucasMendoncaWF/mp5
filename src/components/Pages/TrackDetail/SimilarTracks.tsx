import { useTranslations } from 'next-intl';

import { useSearchTracks } from '@/api/search';

import SearchTracks from '../Search/SearchTracks';

export default function SimilarTracks({ genre }: { genre: string }) {
  const t = useTranslations();
  const { data, isLoading, hasError } = useSearchTracks({ genre, query: '' });
  return (
    <div>
      <SearchTracks
        title={t('similarMusics')}
        fullWidth
        data={data}
        hasError={hasError}
        isLoading={isLoading}
      />
    </div>
  );
}
