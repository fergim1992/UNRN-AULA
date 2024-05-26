'use client';
import { CheckboxGroup, Checkbox, Button } from '@nextui-org/react';
import { Input } from '@/app/ui/form/input';
import { useEffect, useState } from 'react';
import { User } from '@/app/lib/definitions';
import { updateUser } from '@/app/lib/actions';
import { toast } from 'sonner';
import { useUserById } from '../../../hooks/swr-hooks';
import { usePathname } from 'next/navigation';

export const UserForm = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop() ?? '';
  const { user, isLoading, mutateUser } = useUserById(id);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [role, setRole] = useState('');
  const [fingerprint, setFingerprint] = useState(false);
  const [rfid, setRfid] = useState(false);
  const [tagRfid, setTagRfid] = useState(false);

  const [trySubmit, setTrySubmit] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dniError, setDniError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [changes, setChanges] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [accessData, setAccessData] = useState<string[]>([]);

  useEffect(() => {
    setName(user?.name);
    setLastName(user?.last_name);
    setDni(user?.dni.toString());
    setRole(user?.role.toString());
    setFingerprint(user?.fingerprint !== null ? true : false);
    setRfid(user?.rfid !== null ? true : false);
    setTagRfid(user?.tag_rfid !== null ? true : false);
    setAccessData([
      user?.fingerprint !== null ? 'fingerprint' : '',
      user?.rfid !== null ? 'rfid' : '',
      user?.tag_rfid !== null ? 'tag_rfid' : '',
    ]);
    setSelected([
      user?.fingerprint !== null ? 'fingerprint' : '',
      user?.rfid !== null ? 'rfid' : '',
      user?.tag_rfid !== null ? 'tag_rfid' : '',
    ]);
  }, [user]);

  useEffect(() => {
    if (
      name != user?.name ||
      lastName != user?.last_name ||
      dni != user?.dni.toString() ||
      role != user?.role.toString() ||
      fingerprint != (user?.fingerprint !== null ? true : false) ||
      rfid != (user?.rfid !== null ? true : false) ||
      tagRfid != (user?.tag_rfid !== null ? true : false)
    ) {
      setChanges(true);
    } else {
      setChanges(false);
    }
  }, [name, lastName, dni, role, fingerprint, rfid, tagRfid, user]);

  const validateName = (name: string) => {
    const re = /^[A-Za-z\s]+$/;
    if (re.test(name)) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const validateLastName = (last_name: string) => {
    const re = /^[A-Za-z\s]+$/;
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
      updateUser(user.id, formData)
        .then(() => {
          mutateUser(
            {
              ...user,
              name: name,
              last_name: lastName,
              dni: dni,
              role: parseInt(role),
              fingerprint: fingerprint ? 'fingerprint' : null,
              rfid: rfid ? 'rfid' : null,
              tag_rfid: tagRfid ? 'tag_rfid' : null,
            } as User,
            false,
          );
          setLoading(false);
          setTrySubmit(false);
          setOnEdit(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setTrySubmit(false);
          setOnEdit(false);
        }),
      {
        loading: 'Editando...',
        success: 'Usuario creado con exito',
        error: 'Error',
      },
    );
  };
  if (isLoading) return <p>Cargando...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 rounded-lg bg-lightPaper p-5 shadow-xl dark:bg-darkPaper"
    >
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:pb-3">
        <Input
          label="Nombre"
          name="name"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          value={!onEdit ? user.name : name}
          onValueChange={(e) => {
            setName(e);
            if (trySubmit) {
              validateName(e);
            }
          }}
          placeholder="Ingresar nombre"
          errorMessage="Ingresa un nombre valido"
          isReadOnly={!onEdit}
          isRequired={onEdit}
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
          value={!onEdit ? user.last_name : lastName}
          onValueChange={(e) => {
            setLastName(e);
            if (trySubmit) {
              validateLastName(e);
            }
          }}
          placeholder="Ingresar apellido"
          errorMessage="Ingrese un apellido valido"
          readOnly={!onEdit}
          isRequired={onEdit}
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
          value={!onEdit ? user.dni : dni}
          onValueChange={(e) => {
            setDni(e);
            if (trySubmit) {
              validateDni(e);
            }
          }}
          placeholder="Ingresar DNI"
          errorMessage="Ingrese un DNI valido"
          readOnly={!onEdit}
          isRequired={onEdit}
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
          value={!onEdit ? user.role : role}
          onValueChange={(e) => {
            setRole(e);
            if (trySubmit) {
              validateRole(e);
            }
          }}
          placeholder="Ingresar rol"
          errorMessage="Ingresa un rol valido"
          readOnly={!onEdit}
          isRequired={onEdit}
          isInvalid={trySubmit && roleError}
          classNames={{
            inputWrapper: 'p-0 px-2',
            errorMessage: 'absolute top-0 left-0',
            input: 'font-extralight',
          }}
        />
      </div>
      <CheckboxGroup
        label="Datos de acceso"
        color="primary"
        isReadOnly={!onEdit}
        value={!onEdit ? accessData : selected}
        onValueChange={setSelected}
      >
        <div className="flex items-end justify-between md:items-start">
          <div className="flex flex-col gap-1 md:flex-row md:gap-10">
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
          {onEdit ? (
            <>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="primary"
                  variant="bordered"
                  type="submit"
                  isLoading={loading}
                  isDisabled={!changes}
                  onClick={() => {
                    setTrySubmit(true);
                    validateName(name);
                    validateLastName(lastName);
                    validateDni(dni);
                    validateRole(role);
                  }}
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
                    setOnEdit(false);
                    setTrySubmit(false);
                    setNameError(false);
                    setLastNameError(false);
                    setDniError(false);
                    setRoleError(false);
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
              <p className="absolute bottom-[-15px] right-0 text-xs text-danger">
                {!changes && <>No hay cambios</>}
              </p>
            </>
          ) : (
            <Button
              size="sm"
              color="primary"
              className="hover:bg-primary-600"
              onClick={() => setOnEdit(true)}
              endContent={
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              }
            >
              Editar
            </Button>
          )}
        </div>
      </CheckboxGroup>
    </form>
  );
};
