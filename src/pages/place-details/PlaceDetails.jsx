import { useNavigate, useParams } from "react-router-dom";
import { cardsData } from "../places/dataPlace.jsx";
import { CiLocationOn } from "react-icons/ci";
import { FaClock, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-[#faf8f4] dark:bg-gray-900 transition-colors duration-300">
      {cardsData
        .filter((card) => card.id === id)
        .map((card) => (
          <div key={card.id}>
            <div
              className="relative w-full h-[500px] grid md:grid-col-2 justify-center items-center text-center overflow-hidden"
            >
              <div>
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute top-0 left-0 w-[100%] h-[100%] object-cover object-fixed z-0"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-50"></div>
              </div>
              <div className="absolute top-2/3 left-5 bg-[rgb(212,175,55)] z-10 text-[rgb(44,51,51)] text-1xl font-bold rounded-2xl p-2 px-4 shadow-2xl">
                {card.location}
              </div>
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl absolute bottom-16 left-5 font-bold z-20">
                {card.title}
              </h1>
            </div>
            <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    About {card.title}
                  </h1>
                  <br />
                  <div className="mt-8">
                    <p className="text-gray-700 dark:text-gray-300 w-[100%]">
                      {card.content1}
                    </p>
                  </div>
                  <div className="mt-8">
                    <p className="text-gray-700 dark:text-gray-300 w-[100%]">
                      {card.content2}
                    </p>
                  </div>
                  <div className="mt-8">
                    <p className="text-gray-700 dark:text-gray-300 w-[100%]">
                      {card.content3}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-1 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-lg h-fit">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Booking Details
                    </h2>
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <FaDollarSign className="w-5 h-5 text-green-600" />
                      <span>Price: ${card.price}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <FaMapMarkerAlt className="w-5 h-5 text-red-600" />
                      <span>Location: {card.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <FaClock className="w-5 h-5 text-blue-600" />
                      <span>Time: {card.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <CiLocationOn className="w-5 h-5 text-purple-600" />
                      <span>Date: {card.date}</span>
                    </div>
                    <Button
                      onClick={() =>
                        navigate("/checkout", {
                          state: {
                            card: {
                              id: card.id,
                              title: card.title, // CORRECTED: Was 'name'
                              content1: // CORRECTED: Was 'description'
                                card.content1 ||
                                card.content2 ||
                                card.content3 ||
                                "",
                              location: card.location,
                              img: card.img, // CORRECTED: Was 'image'
                              price: card.price, // CORRECTED: Was 'unitPrice'
                              serviceFee: card.serviceFee,
                              orderId: `#${Math.floor(
                                Math.random() * 900000
                              ) + 100000}`,
                              termsLink: card.termsLink,
                              date: card.date,
                              time: card.time,
                            },
                          },
                        })
                      }
                      className="w-full transition duration-500 font-bold text-1xl text-black dark:text-white hover:bg-amber-500 bg-[rgb(232,213,183)] dark:bg-[rgb(35,45,45)]"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlaceDetails;