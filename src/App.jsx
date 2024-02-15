import { useState } from "react";
import Header from "./Layouts/Header";
import WordDefinition from "./WordDefinition";

function App() {
  const [searchedWord, setSearchedWord] = useState("");

  const handleSearch = (word) => {
    setSearchedWord(word);
  };

  return (
    <>
      <div className="">
        <Header onSearch={handleSearch} />
        <WordDefinition word={searchedWord} />
      </div>
    </>
  );
}

export default App;
