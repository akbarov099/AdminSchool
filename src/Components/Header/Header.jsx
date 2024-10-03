import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { BiSolidMoon } from "react-icons/bi";
import { MdWbSunny } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import useDarkModeStore from "../../Store/DarcModeStore";
import useBurgerStore from "../../Store/BurgerStore";
import Translete from "../Translete/Translete";

export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkModeStore();
  const { toggleMenu, isMenuOpen } = useBurgerStore();

  useEffect(() => {
    document.body.className = darkMode ? "body_light" : "body_dark";

    return () => {
      document.body.className = "";
    };
  }, [darkMode]);

  return (
    <header className={`${darkMode ? "header" : "header_dark"}`}>
      <div className="container">
        <div className="header_wrapper">
          <div className="header_left">
            {isMenuOpen ? (
              <FaArrowRightFromBracket
                className="header_burger"
                onClick={toggleMenu}
              />
            ) : (
              <RxHamburgerMenu className="header_burger" onClick={toggleMenu} />
            )}
            <p>Админ панел</p>
          </div>

          <div className="header_right">
            <p className="header_language">
              <Translete />
            </p>
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <BiSolidMoon className="moon" />
              ) : (
                <MdWbSunny className="sun" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
