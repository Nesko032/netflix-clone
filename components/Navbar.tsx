import { useState, useCallback, useEffect } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <>
      <nav className="fixed z-40 w-full">
        <div
          className={`flex flex-row items-center px-4 py-6 transition duration-500 md:px-16 ${
            showBackground ? "bg-zinc-900 bg-opacity-90" : " "
          }`}
        >
          <img className="h-4 lg:h-7" src="/images/logo.png" alt="" />

          <div className="ml-8 hidden flex-row gap-7 lg:flex">
            <NavbarItem label="Home" />
            <NavbarItem label="Series" />
            <NavbarItem label="Film" />
            <NavbarItem label="New & Popular" />
            <NavbarItem label="My List" />
            <NavbarItem label="Browse by languages" />
          </div>

          <div
            className="relative ml-8 flex cursor-pointer flex-row items-center gap-2 lg:hidden"
            onClick={toggleMobileMenu}
          >
            <p className="text-sm text-white">Browse</p>
            <BsChevronDown
              className={`text-white transition ${
                showMobileMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <MobileMenu visible={showMobileMenu} />
          </div>
          <div className="ml-auto flex flex-row items-center gap-7">
            <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
              <BsSearch />
            </div>
            <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
              <BsBell />
            </div>
            <div
              className="relative flex cursor-pointer flex-row items-center gap-2"
              onClick={toggleAccountMenu}
            >
              <div className="h-6 w-6 overflow-hidden rounded-md lg:h-10 lg:w-10">
                <img src="/images/default-red.png" alt="" />
              </div>
              <BsChevronDown
                className={`text-white transition ${
                  showAccountMenu ? "rotate-180" : "rotate-0"
                }`}
              />
              <AccountMenu visible={showAccountMenu} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
