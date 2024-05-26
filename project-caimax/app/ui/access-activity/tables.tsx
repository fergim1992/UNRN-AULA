'use client';
import moment from 'moment';
import {
  useAccessActivity,
  useTotalAccessActivityPages,
} from '../../../hooks/swr-hooks';
import { AccessActivityWithUser } from '@/app/lib/definitions';
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

export const AccessActivityTableComponent = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query;
  const { accessActivity, isLoading } = useAccessActivity(query, currentPage);
  const { totalPages } = useTotalAccessActivityPages(query);

  const { replace } = useRouter();
  const pathname = usePathname();

  const loadingState = isLoading ? 'loading' : 'idle';

  const rows = accessActivity ?? [];

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
      key: 'role',
      label: 'ROL',
      width: '5%',
    },
    {
      key: 'access_type',
      label: 'ACCESO',
      width: '15%',
    },
    {
      key: 'location',
      label: 'UBICACIÓN',
      width: '10%',
    },
    {
      key: 'event',
      label: 'EVENTO',
      width: '10%',
    },
    {
      key: 'date',
      label: 'FECHA',
      width: '10%',
    },
    {
      key: 'time',
      label: 'HORA',
      width: '10%',
    },
  ];
  return (
    <Table
      aria-label="Tabla registros"
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
        aria-label="Header tabla registros"
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
        aria-label="Contenido tabla registros"
        emptyContent="No hay registros en esta página"
      >
        {rows.map((activity: AccessActivityWithUser) => (
          <TableRow key={activity.id} aria-label="Columna">
            <TableCell>{activity.name}</TableCell>
            <TableCell>{activity.last_name}</TableCell>
            <TableCell>{activity.role}</TableCell>
            <TableCell>{activity.access_type}</TableCell>
            <TableCell>{activity.location}</TableCell>
            <TableCell>{activity.event}</TableCell>
            <TableCell>
              {moment(activity.datetime).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell>
              {moment(activity.datetime).format('HH:mm:ss')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
