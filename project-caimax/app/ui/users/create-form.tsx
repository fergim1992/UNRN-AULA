'use client';
import { CheckboxGroup, Checkbox, Button } from '@nextui-org/react';
import { Input } from '@/app/ui/form/input';
import { useState } from 'react';
import { createUser } from '@/app/lib/actions';
import { toast } from 'sonner';
import {
  useUsers,
  useTotalUsersPages,
  useTotalUsers,
} from '../../../hooks/swr-hooks';

type CreateUserFormProps = {
  setActiveForm: (activeForm: boolean) => void;
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export const CreateUserForm = ({
  setActiveForm,
  searchParams,
}: CreateUserFormProps) => {
  const query = searchParams?.query;
  const currentPage = Number(searchParams?.page) || 1;
  const { mutateUsers } = useUsers(query, currentPage);
  const { totalPages, mutateTotalPages } = useTotalUsersPages();
  const { totalUsers, mutateTotalUsers } = useTotalUsers();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [role, setRole] = useState('');
  const [fingerprint, setFingerprint] = useState(false);
  const [rfid, setRfid] = useState(false);
  const [tagRfid, setTagRfid] = useState(false);
  const [selected, setSelected] = useState<string[]>([
    fingerprint ? 'fingerprint' : '',
    rfid ? 'rfid' : '',
    tagRfid ? 'tag_rfid' : '',
  ]);

  const [trySubmit, setTrySubmit] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dniError, setDniError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const validateName = (name: string) => {
    const re = /^.*$/i;
    if (re.test(name)) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const validateLastName = (last_name: string) => {
    const re = /^.*$/i;
    if (re.test(last_name)) {
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }
  };

  const validateDni = (dni: string) => {
    const re = /^\d{7,8}$/;
    if (re.test(dni)) {
      setDniError(false);
    } else {
      setDniError(true);
    }
  };

  const validateRole = (role: string) => {
    if (role == '0' || role == '1' || role == '2') {
      setRoleError(false);
    } else {
      setRoleError(true);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    toast.promise(
      createUser(formData)
        .then(() => {
          if (
            query?.includes(name) ||
            query?.includes(lastName) ||
            query?.includes(dni) ||
            query?.includes(role) ||
            !query
          ) {
            mutateUsers();
          }
          mutateTotalUsers(totalUsers + 1, false);
          if (
            ((query?.includes(name) ||
              query?.includes(lastName) ||
              query?.includes(dni) ||
              query?.includes(role)) &&
              totalUsers % 6 === 0) ||
            (query == undefined && totalUsers % 6 === 0)
          ) {
            mutateTotalPages(totalPages + 1, false);
          }
          setLoading(false);
          setTrySubmit(false);
          setName('');
          setLastName('');
          setDni('');
          setRole('');
          setFingerprint(false);
          setRfid(false);
          setTagRfid(false);
          setSelected([]);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        }),
      {
        loading: 'Creando...',
        success: 'Usuario creado con éxito',
        error: 'Error al crear el usuario',
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-lightPaper p-5 shadow-xl dark:bg-darkPaper"
    >
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:pb-3">
        <Input
          label="Nombre"
          name="name"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={name}
          onValueChange={(e) => {
            setName(e);
            if (trySubmit) {
              validateName(e);
            }
          }}
          placeholder="Ingresar nombre"
          errorMessage="Ingresa un nombre valido"
          isRequired
          isInvalid={trySubmit && nameError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
        <Input
          label="Apellido"
          name="last_name"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={lastName}
          onValueChange={(e) => {
            setLastName(e);
            if (trySubmit) {
              validateLastName(e);
            }
          }}
          placeholder="Ingresar apellido"
          errorMessage="Ingrese un apellido valido"
          isRequired
          isInvalid={trySubmit && lastNameError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
        <Input
          label="DNI"
          name="dni"
          type="number"
          variant="bordered"
          labelPlacement="outside"
          value={dni}
          onValueChange={(e) => {
            setDni(e);
            if (trySubmit) {
              validateDni(e);
            }
          }}
          placeholder="Ingresar DNI"
          errorMessage="Ingrese un DNI valido"
          isRequired
          isInvalid={trySubmit && dniError}
          classNames={{
            inputWrapper: 'p-0',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
        <Input
          label="Rol"
          name="role"
          type="string"
          variant="bordered"
          labelPlacement="outside"
          value={role}
          onValueChange={(e) => {
            setRole(e);
            if (trySubmit) {
              validateRole(e);
            }
          }}
          placeholder="Ingresar rol"
          errorMessage="Ingresa un rol valido"
          isRequired
          isInvalid={trySubmit && roleError}
          classNames={{
            inputWrapper: 'p-0 px-2',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
      </div>
      <div className="flex items-end justify-between">
        <CheckboxGroup
          label="Datos de acceso"
          color="primary"
          value={selected}
          onValueChange={setSelected}
        >
          <div className="flex flex-col gap-1 md:flex-row md:gap-5">
            <Checkbox
              name="fingerprint"
              value="fingerprint"
              onValueChange={setFingerprint}
            >
              Huella digital
            </Checkbox>
            <Checkbox name="rfid" value="rfid" onValueChange={setRfid}>
              RFID
            </Checkbox>
            <Checkbox
              name="tag_rfid"
              value="tag_rfid"
              onValueChange={setTagRfid}
            >
              Tag RFID
            </Checkbox>
          </div>
        </CheckboxGroup>
        <div className="ml-2 flex flex-col gap-1 md:flex-row">
          <Button
            size="sm"
            color="primary"
            variant="bordered"
            type="submit"
            isLoading={loading}
            onClick={() => {
              setTrySubmit(true);
              validateName(name);
              validateLastName(lastName);
              validateDni(dni);
              validateRole(role);
            }}
            isDisabled={loading}
            endContent={
              !loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              )
            }
          ></Button>
          <Button
            size="sm"
            color="danger"
            variant="bordered"
            onClick={() => {
              setTrySubmit(false);
              setNameError(false);
              setLastNameError(false);
              setDniError(false);
              setRoleError(false);
              setActiveForm(false);
            }}
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            }
          ></Button>
        </div>
      </div>
    </form>
  );
};
