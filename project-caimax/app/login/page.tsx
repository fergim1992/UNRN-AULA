import { Metadata } from 'next';

import LoginForm from '@/app/ui/login/login-form';
import Header from '../ui/header';
import Footer from '../ui/footer';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
