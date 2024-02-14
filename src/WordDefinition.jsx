import axios from "axios";
import { useEffect, useState } from "react";
import PlayIcon from "./SVGs/PlayIcon";
import NewWindowIcon from "./SVGs/NewWindowIcon";

function WordDefinition({ word }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        console.log(response);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center px-6 mt-8">
        😕
        <p className="tex-[18px] font-bold mt-5 mb-4">No Definitions Found</p>
        <p className="text-[15px] text-grayWords w-[300px]">
          Sorry pal, we couldn't find definitions for the word you were looking
          for. You can try the search again at later time or head to the web
          instead.
        </p>
      </div>
    );
  }

  const partsOfSpeech = [
    ...new Set(
      data.flatMap((item) =>
        item.meanings.map((meaning) => meaning.partOfSpeech)
      )
    ),
  ];

  const audio = data[0]?.phonetics?.find((item) => item.audio !== "");

  const playAudio = async () => {
    if (data && data.length > 0 && data[0].phonetics.length > 0) {
      if (audio) {
        const newAudio = new Audio(audio.audio);
        newAudio.play();
      }
    }
  };

  return (
    <div>
      {data && data.length > 0 ? (
        <div className="px-6 pb-[85px]">
          <div className="w-full flex items-center justify-between">
            <div className="block">
              <h1 className="font-bold text-[32px] lowercase">{word}</h1>
              <h3 className="mt-2 text-[18px] text-activePurpleBorder">
                {data[0].phonetic}
              </h3>
            </div>
            <PlayIcon playerAudio={playAudio} />
          </div>
          {partsOfSpeech.map((partOfSpeech, index) => (
            <div key={index} className="mt-8">
              <div className="flex items-center justify-between w-full gap-5">
                <h2 className="text-[18px] font-bold lowercase italic">
                  {partOfSpeech}
                </h2>
                <div className="h-[1px] bg-lightGray w-full"></div>
              </div>
              <p className="text-[16px] text-grayWords mt-5">Meaning</p>
              {data
                .flatMap((item) => item.meanings)
                .filter((meaning) => meaning.partOfSpeech === partOfSpeech)
                .map((meaning, meaningIndex) => (
                  <div key={meaningIndex} className="mt-4">
                    {/* Rendering each definition within its own div */}
                    {meaning.definitions.map((definition, definitionIndex) => (
                      <div key={definitionIndex} className="mb-2 flex flex-col">
                        <div className="flex items-baseline gap-5">
                          <div className="w-[5px] h-[5px] bg-activePurpleBorder rounded-full"></div>
                          <p className="font-normal text-[15px] text-meanings w-full">
                            {definition.definition}
                          </p>
                        </div>
                        {definition.example && ( // Check if example exists
                          <p className="text-sm italic text-grayWords mt-1 px-[27px]">
                            "{definition.example}"
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Rendering synonyms */}
                    {meaning.synonyms && meaning.synonyms.length > 0 && (
                      <div className="mt-6 flex items-baseline gap-6">
                        <p className="text-[16px] text-grayWords">Synonyms</p>
                        <div className="flex flex-wrap max-w-full">
                          {meaning.synonyms.map((synonym, synonymIndex) => (
                            <div key={synonymIndex} className="ml-[2px]">
                              <p className="font-normal text-[16px] text-activePurpleBorder">
                                {synonym}
                                {synonymIndex !== meaning.synonyms.length - 1 &&
                                  ", "}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {meaning.antonyms && meaning.antonyms.length > 0 && (
                      <div className="mt-4 flex items-baseline gap-6">
                        <p className="text-[16px] text-grayWords">antonyms</p>
                        <div className="flex flex-wrap max-w-full">
                          {meaning.antonyms.map((synonym, synonymIndex) => (
                            <div key={synonymIndex} className="ml-[2px]">
                              <p className="font-normal text-[16px] text-activePurpleBorder">
                                {synonym}
                                {synonymIndex !== meaning.antonyms.length - 1 &&
                                  ", "}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
          <div className="h-[1px] bg-lightGray w-full mt-8"></div>
          <div className="mt-6">
            <p className="text-[16px] text-grayWords underline">Source</p>
            {data[0].sourceUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-[10px]">
                <p key={index} className="underline">
                  {url}
                </p>
                <NewWindowIcon />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No data available for {word}</div>
      )}
    </div>
  );
}

export default WordDefinition;
