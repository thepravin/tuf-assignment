import React, { useState, useEffect } from "react";
import axios from "axios";

const CodeEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getentries")
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to format timestamp with date and space-separated time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { timeStyle: "short" });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="max-w-4xl mt-8">
      <h2 className="text-2xl font-bold mb-4 m-8">Submitted Entries</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Code Language
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Standard Input
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Source Code
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries && entries.map((entry, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{entry.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {entry.code_language}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.stdin}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                { entry.source_code && entry.source_code.substring(0, 100)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatTimestamp(entry.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeEntries;
