import Logo from "../SVGs/Logo";
import DownArrowIcon from "../SVGs/DownArrowIcon";
import LightModeToggle from "../SVGs/LightModeToggle";
import DarkModeToggle from "../SVGs/DarkModeToggle";
import MoonIcon from "../SVGs/MoonIcon";
import SearchIcon from "../SVGs/SearchIcon";
import DarkMoon from "../SVGs/DarkMoon";
import { useRef, useState, useEffect } from "react";

const Header = ({ onSearch, selectedFont, setSelectedFont }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLightModeVisible, setIsLightModeVisible] = useState(true);
  const [isDarkModeVisible, setIsDarkModeVisible] = useState(false);

  const fontChoose = (font) => {
    setSelectedFont(font);
    setIsOpen(false);
  };

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

  const toggleMode = () => {
    setIsLightModeVisible((prevState) => !prevState);
    setIsDarkModeVisible((prevState) => !prevState);
  };

  const [searchInput, setSearchInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [inputBorder, setInputBorder] = useState("none");

  const handleSearch = () => {
    if (searchInput.trim() === "") {
      // Show error message if search input is empty
      setShowError(true);
      setInputBorder("red");
    } else {
      setShowError(false);
      onSearch(searchInput.trim());
      setInputBorder("none");
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center px-6 py-6 w-screen"
        style={{
          fontFamily:
            selectedFont === "Sans Serif"
              ? "'Inter', sans-serif"
              : selectedFont === "Serif"
              ? "'Lora', serif"
              : selectedFont === "Mono"
              ? "'Inconsolata', monospace"
              : null,
        }}
      >
        <div className="flex flex-row items-start justify-between w-full">
          <Logo />
          <div className="flex flex-row items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-4 border-lightGray border-solid border-r ml-24 py-1 pr-4 cursor-pointer"
                onClick={toggleDropdown}
              >
                <p className="font-bold text-right lg:text-base text-gray-700 md:text-gray-800 lg:text-gray-900">
                  {selectedFont}
                </p>
                <DownArrowIcon />
              </div>
              {isOpen && (
                <div
                  className="absolute z-20 border border-lightGray border-radius-[0.5rem] bg-white left-[136px] w-[126px] p-6 ml-[-2.5rem] cursor-pointer"
                  style={{ top: "100%" }}
                >
                  <ul className="text-gray-700 w-[100px]">
                    <li
                      onClick={() => fontChoose("Sans Serif")}
                      className={`py-1 ${
                        selectedFont === "Sans Serif"
                          ? "text-black"
                          : "text-[#2D2D2D]"
                      } hover:text-[#A445ED]`}
                    >
                      Sans Serif
                    </li>
                    <li
                      onClick={() => fontChoose("Serif")}
                      className={`py-1 ${
                        selectedFont === "Serif"
                          ? "text-black"
                          : "text-[#2D2D2D]"
                      } hover:text-[#A445ED]`}
                    >
                      Serif
                    </li>
                    <li
                      onClick={() => fontChoose("Mono")}
                      className={`py-1 ${
                        selectedFont === "Mono"
                          ? "text-black"
                          : "text-[#2D2D2D]"
                      } hover:text-[#A445ED]`}
                    >
                      Mono
                    </li>
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
        <div className=" w-full grid relative mt-6">
          <input
            id="searchInput"
            className="py-4 px-6 rounded-2xl text-base font-semibold text-black bg-bgInput focus:outline-activePurpleBorder"
            style={{ border: inputBorder }}
            type="text"
            placeholder="Search for any word..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoFocus
          />
          <label className="absolute grid place-items-center top-0 bottom-0 right-0.5">
            <button
              className="bg-transparent border-0 p-5"
              onClick={handleSearch}
            >
              <SearchIcon />
            </button>
          </label>
        </div>
        {showError && (
          <p className="text-red-500 mt-2 self-start">
            Whoops, can’t be empty…
          </p>
        )}
      </div>
    </>
  );
};

export default Header;
