'use client'
import React, { useState, useEffect } from 'react';

interface UrlCheckerProps {}

const UrlChecker: React.FC<UrlCheckerProps> = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const checkUrlSafety = async () => {
    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();

      setResult(data.message);
    } catch (error) {
      console.error(error);
      setResult('An error occurred while checking the URL.');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResult('')
    }, 5000)
  
    return () => clearTimeout(timeout)
  }, [result])
  

  return (
<div className="bg-white p-8 rounded-lg shadow-md w-80 mx-auto mt-16">
  <h1 className="text-2xl font-bold mb-4 text-green-900">URL Safety Checker</h1>
  <div className="flex flex-col gap-4">
    <input
      type="text"
      placeholder="Enter URL"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      className="px-4 py-2 border border-gray-300 text-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={checkUrlSafety}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Check Safety
    </button>
    {result && <p className="text-sm text-gray-600">{result}</p>}
  </div>
</div>

  );
};

export default UrlChecker;
