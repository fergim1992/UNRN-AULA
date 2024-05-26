import { auth } from '@/auth';

const UserInfo = async () => {
  const session = await auth();
  return (
    <p className="mb-3 text-center">
      Bienvenido{' '}
      <span className=" font-bold text-primary">{session?.user?.name}!</span>
    </p>
  );
};

export default UserInfo;
