import Loader from '@/components/Loader';

export default function GlobalLoading() {
  return (
    <Loader position="absolute" width="100vw" height="100vh" backgroundColor="var(--background)" />
  );
}
