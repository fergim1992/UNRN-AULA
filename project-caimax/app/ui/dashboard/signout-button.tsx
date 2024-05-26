import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';

const SignoutButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className="flex items-center justify-center px-5 py-2 hover:text-primary md:w-full">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Cerrar sesión</div>
      </button>
    </form>
  );
};

export default SignoutButton;
