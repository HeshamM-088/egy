import { Tabs, TabsHeader, Tab, TabPanel } from "@material-tailwind/react";
import { CiFilter } from "react-icons/ci";
import Card from "../places/card.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cardsData, data } from "./dataPlace.jsx";
function Places() {
  const [activeTab, setActiveTab] = useState("All");
  const filterCard =
    activeTab === "All"
      ? cardsData
      : cardsData.filter((card) => card.type === activeTab);
  return (
    <div className="transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-1">
      <div
        className=" bg-egypt-pyramids bg-no-repeat relative bg-center 
          bg-cover bg-fixed w-full h-[500px] flex flex-col justify-center items-center
          text-center "
      >
        <div className="layer w-full h-full absolute top-0 bottom-0 right-0 left-0 bg-[#0000005b]"></div>
        <h1 className="text-white text-5xl z-50 font-bold">
          Explore Destinations
        </h1>
        <p className="text-[rgba(255,255,255,0.8)] z-50 text-xl w-[44%] mt-3">
          From ancient monuments to natural wonders, discover all that Egypt has
          to offer.
        </p>
        ّ
      </div>
      <Tabs value="All">
        <div className="w-full gap-3 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-start">
          <p className="flex items-center text-gray-700 dark:text-gray-300 text-lg sm:text-xl font-medium">
            <CiFilter className="mr-1" />
            Filter by:
          </p>
          <TabsHeader className="flex flex-col sm:flex-row sm:ml-3">
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => {
                  setActiveTab(value);
                }}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </div>
        <div className="bg-[rgb(250,248,243)] dark:bg-gray-900 border-t-2 border-t-[rgba(188,186,186,0.27)] dark:border-gray-700 transition-colors duration-300">
          <TabPanel
            value="All"
            className="min-h-screen p-10 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-3 
            justify-items-center "
          >
            {filterCard.slice(0, 9).map((card, index) => (
              <Link to={`/place-details/${card.id}`} key={index}>
                <Card {...card} />
              </Link>
            ))}
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}

export default Places;
