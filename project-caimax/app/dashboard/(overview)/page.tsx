import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <main>
      <h1 className="text-2xl">Dashboard</h1>
    </main>
  );
}
