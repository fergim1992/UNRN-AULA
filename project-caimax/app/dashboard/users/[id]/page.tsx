import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { UserForm } from '@/app/ui/users/edit-form';
import { Toaster } from 'sonner';
import { UserDetailsTableComponent } from '@/app/ui/users/details-table';
import Search from '@/app/ui/search';

// UUIDs vs. Auto-incrementing Keys
// We use UUIDs instead of incrementing keys (e.g., 1, 2, 3, etc.).
// This makes the URL longer; however, UUIDs eliminate the risk of ID collision, are globally unique,
// and reduce the risk of enumeration attacks - making them ideal for large databases.
// However, if you prefer cleaner URLs, you might prefer to use auto-incrementing keys.

export const metadata: Metadata = {
  title: 'Detalles',
};

export default async function Page({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <div>
      <Toaster
        closeButton
        toastOptions={{
          classNames: {
            toast: 'bg-lightPaper dark:bg-darkPaper',
            title: 'text-foreground dark:text-[#FCF6F5]',
            description: 'text-foreground dark:text-[#FCF6F5]',
            error: 'text-danger 1px solid border-danger',
            success: 'text-success 1px solid border-success ',
            actionButton:
              'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
            cancelButton:
              'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
            closeButton:
              'bg-lightPaper dark:bg-darkPaper text-foreground dark:text-[#FCF6F5] border-darkPaper dark:border-lightPaper',
          },
        }}
      />
      <div className="flex justify-between">
        <h1 className="text-2xl">Detalles de usuario</h1>
        <Link href="/dashboard/users">
          <Button color="primary" variant="ghost" className="flex md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </Button>
          <Button
            color="primary"
            variant="ghost"
            className="hidden md:flex"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            }
          >
            Volver
          </Button>
        </Link>
      </div>

      <UserForm />
      <Search placeholder="Buscar registros" />
      <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
        <UserDetailsTableComponent searchParams={searchParams} />
      </div>
    </div>
  );
}
