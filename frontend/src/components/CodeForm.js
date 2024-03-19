import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CodeForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        code_language: 'cpp',
        stdin: '',
        source_code: '',
        stdout:'',
    });
    const navigateTo = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://online-code-compiler.p.rapidapi.com/v1/", {
                code: formData.source_code,
                language: formData.code_language,
                input: formData.stdin,
            }, {
                headers: {
                    'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com',
                    "x-rapidapi-key": "35aebf1e4fmsh7cbd6ef8a1481dfp173d5fjsn5091f0913069",
                    "content-type": "application/json",
                }
            });

            const responseData = res.data;
            setFormData(prevState => ({
                ...prevState,
                stdout: responseData.output
            }));

            console.log(responseData.output);
            console.log(formData);

            await axios.post("http://localhost:8080/insertdata", {
                ...formData,
                stdout: responseData.output
            });
            
            alert("Stored Successfully !!");
            navigateTo("/codeentries")
        } catch (error) {
            console.error(error);
            alert("Error occurred while storing data");
        }
    };
    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit} className="bg-slate-100 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code_language">
                        Preferred Code Language
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="code_language"
                        name="code_language"                      
                        value={formData.code_language}
                        onChange={handleChange}
                    >
                        <option value=""></option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="python3">Python3</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stdin">
                        Standard Input (stdin)
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="stdin"
                        placeholder="Standard Input"
                        name="stdin"
                        value={formData.stdin}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="source_code">
                        Source Code
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="source_code"
                        placeholder="Source Code"
                        name="source_code"
                        value={formData.source_code}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CodeForm;
