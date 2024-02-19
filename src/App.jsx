import { useState } from "react";
import Header from "./Layouts/Header";
import WordDefinition from "./WordDefinition";

function App() {
  const [searchedWord, setSearchedWord] = useState("");
  const [selectedFont, setSelectedFont] = useState("Sans Serif");
  const [activeTheme, setActiveTheme] = useState("light");

  const toggleTheme = () => {
    setActiveTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    const newBackgroundColor = activeTheme === "light" ? "black" : "white";
    document.body.style.background = newBackgroundColor;
  };

  const handleSearch = (word) => {
    setSearchedWord(word);
  };

  return (
    <>
      <div className="">
        <Header
          onSearch={handleSearch}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          activeTheme={activeTheme}
          toggleTheme={toggleTheme}
        />
        <WordDefinition
          word={searchedWord}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          activeTheme={activeTheme}
          toggleTheme={toggleTheme}
        />
      </div>
    </>
  );
}

export default App;
