import '@/app/ui/global.css';

import { Metadata } from 'next';

import Particles from '@/app/ui/particles';
import { ThemeProvider } from '@/context/theme-provider';
import { NextUIProviderContext } from '@/context/nextui-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://caimax.vercel.app/'),
  title: {
    template: '%s | CAIMAX Dashboard',
    default: 'CAIMAX Dashboard',
  },
  description:
    'Proyecto CAIMAX de la materia Laboratorio de Sistemas Embebidos UNRN',
  openGraph: {
    title: 'CAIMAX Dashboard',
    description:
      'Proyecto CAIMAX de la materia Laboratorio de Sistemas Embebidos UNRN',
    url: 'https://caimax.vercel.app/',
    siteName: 'CAIMAX',
    images: [
      {
        url: './opengraph-image.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <NextUIProviderContext>
          <body
            className={'antialiased '}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              overflow: 'auto !important',
            }}
          >
            <Particles />
            {children}
          </body>
        </NextUIProviderContext>
      </ThemeProvider>
    </html>
  );
}
