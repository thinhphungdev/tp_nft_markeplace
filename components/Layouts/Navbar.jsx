import { useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import images from '../../assets';
import { Button } from '../UI/index';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLinks = (idx) => {
    switch (idx) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, idx) => (
        <li
          onClick={() => setActive(item)}
          key={idx}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
            active === item
              ? 'dark:text-white text-nft-black-1'
              : 'dark:text-nft-gray-3 text-nft-gray-2'
          }`}
        >
          <Link href={generateLinks(idx)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true;

  return hasConnected ? (
    <Button
      btnName="Create"
      onClick={() => {
        setActive('');
        router.push('/create-nft');
      }}
      classStyles="rounded-xl mx-2"
    />
  ) : (
    <Button btnName="Connect" classStyles="rounded-xl mx-2" />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        {/* Logo */}
        <Link href="/" onClick={() => {}}>
          <div className="flexCenter md:hidden cursor-pointer">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className=" dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              CryptoKet
            </p>
          </div>
        </Link>
        {/* Logo on mobile device */}
        <Link href="/" onClick={() => {}}>
          <div className="hidden md:flex">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>
      {/* Toggle switch theme mode */}
      {/* For big device */}
      <div className="flex justify-end flex-initial flex-row">
        <div className="flex items-center justify-end mr-2">
          <input
            type="checkbox"
            id="checkbox"
            className="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 rounded-2xl bg-black p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <ButtonGroup setActive={setActive} router={router} />
          <div className="ml-4" />
        </div>
      </div>

      {/* For mobile  */}
      <div className="hidden md:flex ml-2">
        {isOpen ? (
          <Image
            objectFit="contain"
            alt="cross"
            className={theme === 'light' ? 'filter invert' : ''}
            onClick={() => setIsOpen(false)}
            width={25}
            height={25}
            src={images.cross}
          />
        ) : (
          <Image
            objectFit="contain"
            alt="menu"
            className={theme === 'light' ? 'filter invert' : ''}
            onClick={() => setIsOpen(true)}
            width={25}
            height={25}
            src={images.menu}
          />
        )}

        {isOpen && (
          <div className="fixed inset-0 nav-h top-65 dark:bg-nft-dark bg-white z-10 flex flex-col justify-between">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
