"use client";
import axios from "axios";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Page = () => {
  const [data, setData] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/scrape", {
        url: url,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col justify-start items-center w-full h-full mt-20 gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="font-bold text-[40px]">SlideShare Downloader</p>
          <p className="font-bold text-[24px] opacity-70">
            Download Free Presentation
          </p>
        </div>
        <div className="grid grid-cols-8 bg-blue-300 p-10 gap-5 max-w-[800px] w-full rounded-lg">
          <input
            type="text"
            className="col-span-6 rounded-full p-3 outline-blue-500"
            placeholder="Paste url here..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="col-span-2 bg-orange-300 p-2 rounded-xl disabled:opacity-50"
            onClick={fetchData}
            disabled={!url || isLoading}
          >
            {isLoading ? (
              <ClipLoader
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Fetch Data"
            )}
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          {data.map((data) => (
            <img src={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
