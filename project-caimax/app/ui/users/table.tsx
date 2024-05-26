/* eslint-disable indent */
'use client';
import Link from 'next/link';
import { DeleteUserButton } from '@/app/ui/users/delete-user-button';
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { UsersTable } from '@/app/lib/definitions';
import { useState } from 'react';
import { CheckIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTotalUsersPages, useUsers } from '../../../hooks/swr-hooks';
import { usePathname, useRouter } from 'next/navigation';

export const UsersTableComponent = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const [pending, setPending] = useState(false);
  const { users, isLoading } = useUsers(query, currentPage);
  const { totalPages } = useTotalUsersPages(query);
  const { replace } = useRouter();
  const pathname = usePathname();

  const loadingState = isLoading ? 'loading' : 'idle';

  const rows = users ?? [];

  const columns = [
    {
      key: 'name',
      label: 'NOMBRE',
      width: '15%',
    },
    {
      key: 'last_name',
      label: 'APELLIDO',
      width: '15%',
    },
    {
      key: 'dni',
      label: 'DNI',
      width: '15%',
    },
    {
      key: 'role',
      label: 'ROL',
      width: '5%',
    },
    {
      key: 'fingerprint',
      label: 'HUELLA',
      width: '10%',
    },
    {
      key: 'rfid',
      label: 'RFID',
      width: '10%',
    },
    {
      key: 'tag_rfid',
      label: 'TAG RFID',
      width: '10%',
    },
    {
      key: 'see',
      label: 'VER',
      width: '10%',
    },
    {
      key: 'delete',
      label: 'BORRAR',
      width: '10%',
    },
  ];

  return (
    <Table
      aria-label="Tabla usuarios"
      classNames={{
        wrapper: 'bg-lightPaper dark:bg-darkPaper text-center relative',
        th: 'bg-background dark:bg-background text-center text-base w-1',
        tr: 'hover:bg-gray-200 dark:hover:bg-gray-800 h-0',
      }}
      bottomContent={
        totalPages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={currentPage}
              total={totalPages}
              classNames={{
                item: 'bg-background',
                prev: 'bg-background',
                next: 'bg-background',
              }}
              onChange={(page) => {
                const params = new URLSearchParams(searchParams);
                params.set('page', page?.toString());
                replace(`${pathname}?${params.toString()}`);
              }}
            />
          </div>
        ) : null
      }
    >
      <TableHeader
        columns={columns}
        aria-label="Header tabla usuarios"
        className="h-0"
      >
        {(column) => (
          <TableColumn key={column.key} className={'text-center'}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={rows}
        loadingState={loadingState}
        loadingContent={<Spinner />}
        aria-label="Contenido tabla usuarios"
        emptyContent="No hay usuarios en esta página"
      >
        {rows.map((user: UsersTable) => (
          <TableRow key={user.id} aria-label="Columna">
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.last_name}</TableCell>
            <TableCell>{user.dni}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center">
                {user.fingerprint !== null ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <XMarkIcon className="h-5 w-5" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center">
                {user.rfid !== null ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <XMarkIcon className="h-5 w-5" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center">
                {user.tag_rfid !== null ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <XMarkIcon className="h-5 w-5" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center">
                <Link href={`/dashboard/users/${user?.id}`}>
                  <Button
                    className="border-primary hover:border-1 hover:text-primary"
                    variant="light"
                    size="sm"
                  >
                    <UserIcon className="h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center">
                <DeleteUserButton
                  user={user}
                  searchParams={searchParams}
                  setPending={setPending}
                  isDisabled={pending}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
