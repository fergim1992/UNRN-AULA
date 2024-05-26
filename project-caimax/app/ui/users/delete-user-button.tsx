'use client';
import { deleteUser } from '@/app/lib/actions';
import { UsersTable } from '@/app/lib/definitions';
import { Button } from '@nextui-org/react';
import { useContext } from 'react';
import ThemeContext from '@/context/theme-context';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  useUsers,
  useTotalUsers,
  useTotalUsersPages,
} from '../../../hooks/swr-hooks';
import { TrashIcon } from '@heroicons/react/24/outline';

export const DeleteUserButton = ({
  user,
  searchParams,
  isDisabled,
  setPending,
}: {
  user: UsersTable;
  searchParams?: {
    query?: string;
    page?: string;
  };
  isDisabled: boolean;
  setPending: (pending: boolean) => void;
}) => {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const { users, mutateUsers } = useUsers(query, currentPage);
  const { totalUsers, mutateTotalUsers } = useTotalUsers();
  const { totalPages, mutateTotalPages } = useTotalUsersPages();
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      className="border-danger font-bold hover:border-1 hover:text-danger"
      variant="light"
      size="sm"
      isDisabled={isDisabled}
      onClick={() => {
        Swal.fire({
          title: `Estas seguro de eliminar a "${user.name} ${user.last_name}"?`,
          icon: 'warning',
          showCancelButton: true,
          iconColor: 'red',
          background: theme === 'dark' ? '#17222e' : '#FCF6F5',
          color: theme === 'dark' ? '#FCF6F5' : '#101820',
          confirmButtonColor: 'red',
          confirmButtonText: 'Si, deseo eliminarlo!',
          cancelButtonColor: theme === 'dark' ? '#17222e' : '#FCF6F5',
          cancelButtonText: `<span style="color: ${theme === 'dark' ? '#FCF6F5' : '#101820'}">Cancelar</span>`,
        }).then((result) => {
          if (result.isConfirmed) {
            setPending(true);
            toast.promise(
              deleteUser(user.id)
                .then(() => {
                  mutateTotalUsers(totalUsers - 1, false);
                  if (totalUsers % 6 === 5 && totalPages > 1) {
                    mutateTotalPages(totalPages - 1, false);
                  }
                  if (users.length === 1 && currentPage > 1) {
                    const newPage = currentPage - 1;
                    const newPath = `/dashboard/users?page=${newPage}${query ? `&query=${query}` : ''}`;
                    router.push(newPath);
                  }
                  mutateUsers();
                })
                .catch((error) => {
                  console.error('Failed to delete user:', error);
                })
                .finally(() => {
                  setPending(false);
                }),
              {
                loading: 'Eliminando usuario...',
                success: 'Usuario eliminado exitosamente!',
                error: 'Error al eliminar usuario',
              },
            );
          }
        });
      }}
    >
      <TrashIcon className="h-6 w-6" />
    </Button>
  );
};
