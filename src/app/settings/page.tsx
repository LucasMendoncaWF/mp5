'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import PrimaryButton from '@/components/Shared/Material/Buttons/PrimaryButton';
import LanguageSwitcher from '@/components/Shared/Material/LanguageSwitcher';
import ThemeSelector from '@/components/Shared/Material/ThemeSelector';
import Subscriptions from '@/components/Shared/Sections/Subscriptions';

export default function SettingsPage() {
  const t = useTranslations();
  return (
    <div className="relative w-full max-h-full md:px-6 overflow-auto flex flex-wrap justify-center">
      <div className="max-w-200 w-full py-10 md:bg-background drop-shadow-modal">
        <div className="px-6">
          <div className="w-full p-4 text-text-color normal-case font-bold text-xl">
            {t('generalSettings')}
          </div>
          <div className="p-4 mt-2">
            <div className="mb-4 flex gap-2 items-center normal-case">
              {t('changeTheme')}: <ThemeSelector />
            </div>
            <div className="flex gap-2 items-center normal-case">
              {t('changeLanguage')}:<LanguageSwitcher />
            </div>
          </div>
        </div>
        <div className="p-6">
          <Subscriptions />
        </div>
        <div className="p-6">
          <div className="w-full p-4 text-text-color normal-case font-bold text-xl">
            {t('familyGroup')}
          </div>
          <div className="flex justify-center opacity-80 dark:invert">
            <Image alt="family" src="/images/family.png" width="200" height="200" />
          </div>
          <div className="flex justify-center">
            <PrimaryButton ariaLabel="create">{t('createFamilyGroup')}</PrimaryButton>
          </div>
        </div>
        <div className="text-text-color mt-10 font-bold opacity-60 normal-case text-center hover:underline transition cursor-pointer">
          <span className="border-2 rounded-full px-2 py-[2px] mr-3">?</span>
          {t('contactSupport')}
        </div>
      </div>
    </div>
  );
}
