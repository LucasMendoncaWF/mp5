import { useTranslations } from 'next-intl';

const MusicPage = () => {
  const t = useTranslations('music_layout');
  return <div className="text-primary">{t('title')}</div>;
};

export default MusicPage;
