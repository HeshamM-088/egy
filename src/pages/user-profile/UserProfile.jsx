import { Tabs, TabsHeader, Tab, TabPanel } from "@material-tailwind/react";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import { cardsData, data2 } from "../places/dataPlace";
import { Link } from "react-router-dom";
import Card from "../places/card";
import { FaUser, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
function Places() {
  const [activeTab, setActiveTab] = useState("All");
  const filterCard =
    activeTab === "All"
      ? cardsData
      : cardsData.filter((card) => card.type === activeTab);
  return (
    <div className="min-h-fit">
      <div
        className="w-full py-12 px-4 flex flex-col items-center justify-center text-white"
        style={{ backgroundColor: "#20968c" }}
      >
        <div
          className="
            w-24 h-24 
            rounded-full 
            bg-white bg-opacity-20 
            flex items-center justify-center 
            mb-5
          "
        >
          <FaUser className="text-white text-4xl" />
        </div>
        <h1 className="text-white text-center text-4xl sm:text-5xl font-normal mb-1">
          Welcome Back!
        </h1>
        <p className="text-white text-opacity-80 text-lg sm:text-xl font-light mb-8">
          traveler@egyguide.com
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div
            className="
              flex items-center 
              bg-white bg-opacity-20 
              rounded-full 
              px-4 py-2 
              text-base font-medium 
              w-max mx-auto 
            "
          >
            <FaMapMarkerAlt className="mr-2 text-sm" />5 Destinations Visited
          </div>
          <div
            className="
              flex items-center 
              bg-white bg-opacity-20 
              rounded-full 
              px-4 py-2 
              text-base font-medium 
              w-max mx-auto 
            "
          >
            <FaHeart className="mr-2 text-sm" />3 Favorites
          </div>
        </div>
      </div>
      <Tabs value="All">
        <div className="w-full gap-3 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-start">
          <p className="flex items-center text-[rgb(107,93,79)] text-lg sm:text-xl font-medium">
            <CiFilter className="mr-1" />
            Filter by:
          </p>
          <TabsHeader className="flex flex-col sm:flex-row sm:ml-3 w-60">
            {data2.map(({ label, value }) => (
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
        <div className="bg-[rgb(250,248,243)] border-t-2 border-t-[rgba(188,186,186,0.27)] ">
          <TabPanel
            value="All"
            className="min-h-screen p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 
            justify-items-center "
          >
            {filterCard.slice(0, 3).map((card, index) => (
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
