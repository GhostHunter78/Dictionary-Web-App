// Import Axios library
import axios from "axios";
import { useEffect, useState } from "react";

// Component to fetch and display word definitions
function WordDefinition({ word }) {
  // State to hold the fetched data
  const [data, setData] = useState(null);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle error state
  const [error, setError] = useState(null);

  // Define the API endpoint
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  // Function to fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(apiUrl);
        // Extract the data from the response
        const data = response.data;
        // Set the fetched data to the state
        console.log(response);
        setData(data);
      } catch (error) {
        // Set error state if an error occurs
        setError(error);
      } finally {
        // Set loading state to false when request completes (whether it succeeded or failed)
        setLoading(false);
      }
    }
    // Call the fetchData function to initiate the request
    fetchData();
  }, [apiUrl]);

  // Render loading state if data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Rendering error message if an error occurred
  if (error) {
    return (
      <div>
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </div>
    );
  }

  // Rendering fetched data
  return (
    <div>
      {data && data.length > 0 && (
        <div>
          <h2>{word}</h2>
        </div>
      )}
      {/* Rendering a message if no data is available */}
      {!data && <div>No data available for {word}</div>}
    </div>
  );
}

export default WordDefinition;
