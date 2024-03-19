import React, { useState, useEffect } from "react";
import axios from "axios";

const CodeEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getentries`)
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

  // Function to toggle showing full code for a specific entry
  const toggleShowFullCode = (index) => {
    setEntries(entries.map((entry, i) => {
      if (i === index) {
        return { ...entry, showFullCode: !entry.showFullCode };
      } else {
        return entry;
      }
    }));
  };

  return (
    <div className="max-w-4xl mt-8 mx-8 ">
      <h2 className="text-2xl font-bold mb-4 m-8">Submitted Entries</h2>

      <table className="w-[1400px] ml-4 border border-slate-300 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-slate-300">Username</th>
            <th className="border border-slate-300">Code Language</th>
            <th className="border border-slate-300">Standard Input</th>
            <th className="border border-slate-300">Source Code</th>
            <th className="border border-slate-300">Output (stdout)</th>
            <th className="border border-slate-300">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries &&
            entries.map((entry, index) => (
              <tr key={index}>
                <td className="border border-slate-300 text-center">
                  {entry.username}
                </td>
                <td className="border border-slate-300 text-center">
                  {entry.code_language}
                </td>
                <td className="border border-slate-300 text-center">
                  {entry.stdin}
                </td>
                <td className="border border-slate-300">
                  {entry.showFullCode
                    ? entry.source_code
                    : entry.source_code.substring(0, 100)}
                  {entry.source_code.length > 100 && (
                    <button
                      onClick={() => toggleShowFullCode(index)}
                      className="text-blue-500 hover:underline ml-2"
                    >
                      {entry.showFullCode ? "See Less" : "See More"}
                    </button>
                  )}
                </td>
                <td className="text-center border border-slate-300">
                  {entry.stdout}
                </td>
                <td className="border border-slate-300 text-center">
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
