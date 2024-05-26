'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Usuarios',
    href: '/dashboard/users',
    icon: UserGroupIcon,
  },
  {
    name: 'Registros',
    href: '/dashboard/registers',
    icon: DocumentDuplicateIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const pathVlidation = pathname.split('/').slice(0, 3).join('/');

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('px-5 py-2 hover:text-primary md:flex md:w-full', {
              'text-primary md:bg-foreground': pathVlidation === link.href,
            })}
          >
            <LinkIcon className="w-6 " />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
