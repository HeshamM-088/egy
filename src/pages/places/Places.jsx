import React, { useEffect, useState } from "react";
import { Tabs, TabsHeader, Tab, TabPanel } from "@material-tailwind/react";
import { CiFilter } from "react-icons/ci";
import Card from "../places/card.jsx";
import { Link } from "react-router-dom";

// 👇 تحديد BASE من .env أو Vercel
const rawBase =
  import.meta.env.VITE_API_URL || "https://egi-topaz.vercel.app/api/v1/";
const BASE = rawBase.endsWith("/") ? rawBase : rawBase + "/";

const EVENTS_API = `${BASE}events`;

function Places() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ GET Events من الباك اند
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(EVENTS_API);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Failed to load places");

        setEvents(json.data || []);
      } catch (err) {
        console.error("Places fetch error:", err);
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // ✅ تجهيز بيانات الفلتر والتابس
  const filterCard =
    activeTab === "All"
      ? events
      : events.filter((event) => event.category === activeTab);

  const tabsData = [
    { label: "All", value: "All" },
    { label: "Historical", value: "Historical" },
    { label: "Cultural", value: "Cultural" },
    { label: "Natural", value: "Natural" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 animate-pulse text-lg">Loading places…</p>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f4] dark:bg-gray-900 transition-colors duration-300 min-h-screen p-5">
      {/* Header Image */}
      <div className="bg-egypt-pyramids bg-no-repeat relative bg-center 
          bg-cover bg-fixed w-full h-[500px] flex flex-col justify-center items-center text-center rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="text-white text-5xl z-10 font-bold">Explore Destinations</h1>
        <p className="text-[rgba(255,255,255,0.8)] z-10 text-xl w-[50%] mt-3">
          Discover amazing events and destinations across Egypt.
        </p>
      </div>

      {/* Tabs & Filter */}
      <Tabs value={activeTab}>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3">
          <p className="flex items-center text-gray-700 dark:text-gray-300 text-xl font-medium">
            <CiFilter className="mr-1" />
            Filter by:
          </p>

          <TabsHeader className="flex flex-col sm:flex-row sm:ml-3 bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
            {tabsData.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className="text-gray-900 dark:text-white text-lg font-bold px-4 py-2"
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </div>

        <div className="bg-[rgb(250,248,243)] dark:bg-gray-900 transition-colors duration-300 border-t border-gray-300 dark:border-gray-700 rounded-lg mt-3 shadow">
          <TabPanel
            value={activeTab}
            className="min-h-[calc(100vh-520px)] p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
          >
            {error && (
              <div className="col-span-full bg-red-100 text-red-700 p-3 rounded-md text-sm shadow">
                Error: {error}
              </div>
            )}

            {filterCard.length === 0 && !error && (
              <p className="text-gray-500 dark:text-gray-400 col-span-full text-xl">
                No places available.
              </p>
            )}

            {filterCard.map((event) => (
              <Link to={`/place-details/${event._id}`} key={event._id}>
                <Card
                  title={event.title}
                  location={event.location}
                  type={event.category}
                  rating={event.rating || "N/A"}
                  reviews={event.reviews || 0}
                  img={event.img}
                />
              </Link>
            ))}
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}

export default Places;
