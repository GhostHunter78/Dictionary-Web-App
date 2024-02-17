import { useState } from "react";
import Header from "./Layouts/Header";
import WordDefinition from "./WordDefinition";

function App() {
  const [searchedWord, setSearchedWord] = useState("");
  const [selectedFont, setSelectedFont] = useState("Sans Serif");

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
        />
        <WordDefinition
          word={searchedWord}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
        />
      </div>
    </>
  );
}

export default App;
