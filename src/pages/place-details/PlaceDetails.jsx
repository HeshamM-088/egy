import { useParams } from "react-router-dom";
import { cardsData } from "../places/dataPlace.jsx";
import { CiLocationOn } from "react-icons/ci";
import { FaClock, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

const PlaceDetails = () => {
  const { id } = useParams();

  return (
    <div className="bg-[#00000037] ">
      {cardsData
        .filter((card) => card.id === id)
        .map((card) => (
          <div key={card.id}>
            <div
              className="relative w-full h-[500px] grid md:grid-col-2
              justify-center items-center text-center overflow-hidden"
            >
              <div>
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute top-0 left-0 w-[100%]
                  h-[100%] object-cover object-fixed z-0"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
              </div>

              <div className="absolute top-2/3 left-5 bg-[rgb(212,175,55)] z-50 text-[rgb(44,36,22)] px-3 py-1 rounded-full text-sm">
                {card.type}
              </div>

              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl absolute bottom-16 left-5 font-bold z-20">
                {card.title}
              </h1>

              <div className="absolute bottom-5 left-5 flex items-center gap-4 z-20">
                <p className="text-white text-base font-semibold flex items-center gap-2 flex-row px-3 py-1 rounded-lg backdrop-blur-sm">
                  <CiLocationOn />
                  {card.location}
                </p>
                <div className="flex items-center gap-2 text-white px-3 py-1 rounded-lg backdrop-blur-sm">
                  <span>⭐</span>
                  <p className="text-sm font-medium">{card.rating}</p>
                  <span>({card.reviews})</span>
                </div>
              </div>
            </div>

            <div className="content flex gap-5 flex-row justify-between w-full h-full p-10">
              <div className="bg-white w-[66%] rounded-2xl shadow-sm p-9">
                <h1 className="text-2xl font-bold">About {card.title}</h1>
                <br />
                <div className="mt-8">
                  <p className="text-gray-500 w-[100%]">{card.content1}</p>
                </div>
                <div className="mt-8">
                  <p className="text-gray-500 w-[100%]">{card.content2}</p>
                </div>
                <div className="mt-8">
                  <p className="text-gray-500 w-[100%]">{card.content3}</p>
                </div>
              </div>

              <div className="flex w-[34%] flex-col gap-3">
                <div className="w-full bg-[#faf8f4] h-full rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Quick Information
                  </h2>

                  <div className="flex items-start gap-3 mb-4">
                    <FaClock className="text-teal-600 text-xl mt-3" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Opening Hours
                      </p>
                      <p className="text-gray-800">8:00 AM - 5:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <FaDollarSign className="text-teal-600 text-xl mt-3" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Entry Fee
                      </p>
                      <p className="text-gray-800">$15 - $30</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-teal-600 text-xl mt-3" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Location
                      </p>
                      <p className="text-gray-800">Giza, Cairo</p>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-[rgb(26,155,142)] text-white rounded-2xl shadow-md border border-gray-200 p-6">
                  <h2 className="text-2xl font-semibold mb-3">
                    Plan Your Visit
                  </h2>
                  <p className="text-sm text-gray-200 mb-6">
                    Book a guided tour and make the most of your experience
                    exploring this site.
                  </p>
                  <div className="flex justify-center">
                    <Button className="w-full transition duration-500 font-bold text-1xl text-black hover:bg-amber-500 bg-[rgb(232,213,183)]">
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
