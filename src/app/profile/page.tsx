'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useGetUserProfile } from '@/api/userProfile';
import PrimaryButton from '@/components/Shared/Buttons/PrimaryButton';
import Subscriptions from '@/components/Shared/Subscriptions';

export default function ProfilePage() {
  const { data, isLoading, hasError } = useGetUserProfile();
  const [form, setForm] = useState({
    user_name: '',
    user_email: '',
    user_full_name: '',
    password: '',
    password_confirm: '',
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  useEffect(() => {
    if (data) {
      setForm((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const t = useTranslations();
  return (
    <div className="relative w-full max-h-full md:px-6 overflow-auto flex flex-wrap justify-center">
      <div className="max-w-200 w-full py-10 md:bg-background drop-shadow-modal">
        {hasError && (
          <div className="p-5 px-7 normal-case text-white bg-red-500 dark:bg-red-700 md:rounded-xl text-center absolute md:left-5 md:top-5 top-0 w-full md:w-150 fade-in">
            {t('profileError')}
          </div>
        )}
        <div className="flex justify-center">
          <Image
            className="cursor-pointer hover:opacity-80 aspect-square"
            width="180"
            height="180"
            src="/images/profile.png"
            alt="profile picture"
          />
        </div>
        <div className="py-8 md:py-10 px-6 flex justify-center items-center gap-4">
          <div className="text-text-color w-100 normal-case text-sm">
            <div className="relative">
              <label className="absolute left-4 top-2" htmlFor="user_name">
                {form.user_name ? '' : t('username')}
              </label>
              <input
                disabled={isLoading || hasError}
                id="user_name"
                onChange={handleInputChange}
                value={form.user_name}
                className="mb-3 p-2 px-4 border-text-color border-1 rounded-lg w-full"
              />
            </div>
            <div className="relative">
              <label className="absolute left-4 top-2" htmlFor="user_email">
                {form.user_email ? '' : t('email')}
              </label>
              <input
                disabled={isLoading || hasError}
                id="user_email"
                type="e-mail"
                onChange={handleInputChange}
                value={form.user_email}
                className="mb-3 p-2 px-4 border-text-color border-1 rounded-lg w-full"
              />
            </div>
            <div className="relative">
              <label className="absolute left-4 top-2" htmlFor="user_full_name">
                {form.user_full_name ? '' : t('fullname')}
              </label>
              <input
                disabled={isLoading || hasError}
                id="user_full_name"
                onChange={handleInputChange}
                value={form.user_full_name}
                className="p-2 mb-3 px-4 border-text-color border-1 rounded-lg w-full"
              />
            </div>
            <PrimaryButton ariaLabel="save changes">{t('saveChanges')}</PrimaryButton>
          </div>
        </div>
        <div className="text-text-color px-6 py-8 md:py-10 flex justify-center w-full normal-case text-sm">
          <div className="w-100">
            <div className="capitalize text-xl mb-4 text-primary">{t('changePassword')}</div>
            <div className="relative">
              <label className="absolute left-4 top-2" htmlFor="password">
                {form.password ? '' : t('password')}
              </label>
              <input
                disabled={isLoading || hasError}
                id="password"
                type="password"
                onChange={handleInputChange}
                value={form.password}
                className="mb-3 p-2 px-4 border-text-color border-1 rounded-lg w-full"
              />
            </div>
            <div className="relative">
              <label className="absolute left-4 top-2" htmlFor="password_confirm">
                {form.password_confirm ? '' : t('passwordConfirm')}
              </label>
              <input
                disabled={isLoading || hasError}
                id="password_confirm"
                type="password"
                onChange={handleInputChange}
                value={form.password_confirm}
                className="mb-3 p-2 px-4 border-text-color border-1 rounded-lg w-full"
              />
            </div>
            <PrimaryButton ariaLabel="save changes">{t('saveChanges')}</PrimaryButton>
          </div>
        </div>
        <div className="p-6 rounded-3xl">
          <Subscriptions />
        </div>

        <div className="normal-case text-center underline cursor-pointer hover:opacity-80">
          {t('deleteAccount')}
        </div>
      </div>
    </div>
  );
}
