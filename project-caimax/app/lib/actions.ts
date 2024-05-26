/* eslint-disable indent */
'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';

export type State = {
  errors?: {
    name?: string[];
    last_name?: string[];
    dni?: string[];
    role?: string[];
    fingerprint?: string[];
    rfid?: string[];
    tag_rfid?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  last_name: z.string(),
  dni: z.string(),
  role: z.string(),
  fingerprint: z.string().nullable(),
  rfid: z.string().nullable(),
  tag_rfid: z.string().nullable(),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales invalidas';
        default:
          return 'Algo salio mal :(';
      }
    }
    throw error;
  }
}

const CreateUser = FormSchema.omit({ id: true });

export async function createUser(formData: FormData): Promise<string> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const validatedFields = CreateUser.safeParse({
      name: formData.get('name'),
      last_name: formData.get('last_name'),
      dni: formData.get('dni'),
      role: formData.get('role'),
      fingerprint: formData.get('fingerprint'),
      rfid: formData.get('rfid'),
      tag_rfid: formData.get('tag_rfid'),
    });

    if (!validatedFields.success) {
      reject({
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Faltan datos. Error al crear usuario.',
      });
      return;
    }

    const { name, last_name, dni, role, fingerprint, rfid, tag_rfid } =
      validatedFields.data;

    try {
      await sql`
        INSERT INTO users (name, last_name, dni, role, fingerprint, rfid, tag_rfid)
        VALUES (${name}, ${last_name}, ${dni}, ${role}, ${fingerprint}, ${rfid}, ${tag_rfid})
      `;
      revalidatePath('/dashboard/users');
      resolve('Usuario creado con éxito');
    } catch (error) {
      revalidatePath('/dashboard/users');
      reject({ message: 'Database Error: Failed to Create User.' });
    }
  });
}

const UpdateUser = FormSchema.omit({ id: true });

export async function updateUser(id: string, formData: FormData) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const validatedFields = UpdateUser.safeParse({
      name: formData.get('name'),
      last_name: formData.get('last_name'),
      dni: formData.get('dni'),
      role: formData.get('role'),
      fingerprint: formData.get('fingerprint'),
      rfid: formData.get('rfid'),
      tag_rfid: formData.get('tag_rfid'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Faltan datos. Error al actualizar usuario.',
      };
    }

    const { name, last_name, dni, role, fingerprint, rfid, tag_rfid } =
      validatedFields.data;

    try {
      await sql`
        UPDATE users
        SET name = ${name}, last_name = ${last_name}, dni = ${dni}, 
        role = ${role}, fingerprint = ${fingerprint}, rfid = ${rfid}, tag_rfid = ${tag_rfid}
        WHERE id = ${id}
      `;
      resolve('Usuario actualizado con éxito');
    } catch (error) {
      reject({ message: 'Database Error: Failed to Update User.' });
    }

    revalidatePath(`/dashboard/users/${id}`);
  });
}

export async function deleteUser(id: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath('/dashboard/users');
    return { message: 'Usuario eliminado.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete User.' };
  }
}
