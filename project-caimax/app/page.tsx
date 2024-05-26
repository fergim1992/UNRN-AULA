import Link from 'next/link';
import Image from 'next/image';
import LogoDark from '@/public/logos/Main_Logo_White_Green.png';
import Header from './ui/header';
import Footer from './ui/footer';
import { Button } from '@nextui-org/react';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-grow flex-col items-center justify-center p-6">
          <Image
            src={LogoDark}
            width={300}
            height={300}
            className="select-none md:block"
            alt="CAIMAX MainLogo"
            draggable="false"
            style={{
              userSelect: 'none',
              filter: 'drop-shadow(0 5px 5px rgba(255, 255, 255, .1))',
            }}
          />

          <Link href="/login">
            <Button color="primary" variant="ghost">
              Ingresar
            </Button>
          </Link>

          <p className="text-skin-base mt-4 text-center text-lg">
            Control de Acceso Inteligente de Máxima Seguridad
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
