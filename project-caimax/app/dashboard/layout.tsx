import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-grow flex-col justify-between md:flex-row">
      <SideNav />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-10">{children}</div>
    </div>
  );
}
