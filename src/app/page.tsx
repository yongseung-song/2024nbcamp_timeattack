import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href={'/signin'}>Sign in</Link>
    </main>
  );
}
