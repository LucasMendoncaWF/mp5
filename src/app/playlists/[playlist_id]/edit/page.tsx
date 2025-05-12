import { useTranslations } from 'next-intl';

export default function PlaylistEditPage() {
  const t = useTranslations();
  return <div className="normal-case text-center p-10 text-red-600">{t('cantEditPlaylist')}</div>;
}
