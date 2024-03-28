"use client";

import scrapeWebsite from "@/libs/scrapper";
import { useState } from "react";

export default function Home() {
  const [titles, setTitles] = useState<any[]>([]);
  const url = "https://www.slideshare.net/marketingartwork/ai-trends-in-creative-operations-2024-by-artwork-flowpdf";

  const handleScrape = async () => {
    const scrapedTitles = await scrapeWebsite(url);
    setTitles(scrapedTitles);
  };
  return (
    <div>
      <button onClick={handleScrape}>Pull Data</button>
      <div>
        {titles.map((title: string, index: number) => (
          <img key={index} src={url + title} />
        ))}
      </div>
    </div>
  );
}
