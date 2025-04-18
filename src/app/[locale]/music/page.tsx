
import { useTranslations } from 'next-intl';

const MusicPage = () => {
  const t = useTranslations('music_layout');
  return (
    <div>
      {t('title')}
      about
    </div>
  );
};

export default MusicPage;