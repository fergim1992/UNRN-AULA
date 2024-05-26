import AlternativeLogo from './logo/alternative-logo';
import ToggleTheme from './toggle-theme';

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      <AlternativeLogo width={200} height={200} />
      <ToggleTheme className="m-3 p-2 text-4xl" />
    </header>
  );
};

export default Header;
