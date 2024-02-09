import Logo from "../SVGs/Logo";
import DownArrowIcon from "../SVGs/DownArrowIcon";
import LightModeToggle from "../SVGs/LightModeToggle";
import DarkModeToggle from "../SVGs/DarkModeToggle";
import MoonIcon from "../SVGs/MoonIcon";
import DarkMoon from "../SVGs/DarkMoon";
import { useRef, useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // using useEffect to handle the outside of the dropdown click action
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [isLightModeVisible, setIsLightModeVisible] = useState(true);
  const [isDarkModeVisible, setIsDarkModeVisible] = useState(false);

  const toggleMode = () => {
    setIsLightModeVisible((prevState) => !prevState);
    setIsDarkModeVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="px-6 pt-6 pb-[85px] flex flex-row items-start justify-between w-screen">
        <Logo />
        <div className="flex flex-row items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-[126px] flex items-center gap-4 border-lightGray border-solid border-r ml-24 py-1 pr-4 cursor-pointer"
              onClick={toggleDropdown}
            >
              <p className="font-inter font-bold text-right lg:text-base text-gray-700 md:text-gray-800 lg:text-gray-900">
                Sans Serif
              </p>
              <DownArrowIcon />
            </div>
            {isOpen && (
              <div
                className="absolute z-20 border border-lightGray border-radius-[0.5rem] left-[136px] w-[126px] p-6 ml-[-2.5rem] cursor-pointer"
                style={{ top: "100%" }}
              >
                <ul className="text-gray-700">
                  <li className="py-1 font-inter">Sans Serif</li>
                  <li className="py-1 font-serif">Serif</li>
                  <li className="py-1 font-mono">Mono</li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center gap-3">
            <LightModeToggle
              onClick={toggleMode}
              isVisible={isLightModeVisible}
            />

            <DarkModeToggle
              onClick={toggleMode}
              isVisible={isDarkModeVisible}
            />
            <MoonIcon onClick={toggleMode} isVisible={isLightModeVisible} />
            <DarkMoon onClick={toggleMode} isVisible={isDarkModeVisible} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
