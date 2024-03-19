import React, { useState, useEffect } from "react";
import axios from "axios";

const CodeEntries = () => {
  const [entries, setEntries] = useState([]);
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getentries")
      .then((res) => {
        setEntries(res.data);
        fetchOutputs(res.data); // Call function to fetch outputs for each entry
      })
      .catch((err) => console.log(err));
  }, []);

  //Function to fetch outputs for each code entry from Judge0 API
  const fetchOutputs = async (entries) => {
    const outputsArray = [];
    for (const entry of entries) {
      try {
        const res = await axios.post("https://online-code-compiler.p.rapidapi.com/v1/", {
          code: entry.source_code,
          language: entry.code_language,
          input: entry.stdin,
        }, {
          headers: {
            'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com',
            "x-rapidapi-key": "35aebf1e4fmsh7cbd6ef8a1481dfp173d5fjsn5091f0913069",
            "content-type": "application/json",
          }
        });
        const output = res.data.output || 'Loading...'; // If output is not available, display "Loading..."
        outputsArray.push(output);
      } catch (err) {
        console.log(err);
        outputsArray.push('Error fetching output');
      }
    }
    setOutputs(outputsArray);
  };

  // Function to format timestamp with date and space-separated time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { timeStyle: "short" });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="max-w-4xl mt-8 mx-8">
      <h2 className="text-2xl font-bold mb-4 m-8">Submitted Entries</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>Username</th>
            <th>Code Language</th>
            <th>Standard Input</th>
            <th>Source Code</th>
            <th>Output (stdout)</th>
            <th>Timestamp</th>
          </tr>
        </thead> 
        <tbody className="bg-white divide-y divide-gray-200">
          {entries && entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.code_language}</td>
              <td>{entry.stdin}</td>
              <td>{entry.source_code && entry.source_code.substring(0, 100)}</td>
              <td>{outputs[index]}</td> {/* Display output from outputs array */}
              <td>{formatTimestamp(entry.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeEntries;
