import { AccessActivityTableComponent } from '@/app/ui/access-activity/tables';
import Search from '@/app/ui/search';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registros',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  return (
    <div>
      <h1 className="text-2xl">Registros</h1>
      <Search placeholder="Buscar registros" />
      <div className="relative mt-3 overflow-x-auto overflow-y-hidden shadow-xl sm:rounded-lg">
        <AccessActivityTableComponent searchParams={searchParams} />
      </div>
    </div>
  );
}
