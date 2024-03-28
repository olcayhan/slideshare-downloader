"use client";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const [data, setData] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/scrape", {
        url: "https://www.slideshare.net/atkearney/pursuing-customer-inspired-growth",
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <hr />
      <div>
        {data.map((data) => (
          <img src={data} />
        ))}
      </div>
    </div>
  );
};

export default Page;
