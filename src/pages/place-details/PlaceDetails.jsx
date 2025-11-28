import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaClock, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

const EVENTS_API = `https://egi-topaz.vercel.app/api/v1/events`;

const INITIAL_FORM_STATE = {
  _id: null,
  title: "",
  description: "",
  date: "",
  location: "",
  img: "",
  entryFee: "",
  openingHours: { from: "", to: "" },
  category: "Historical",
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(EVENTS_API + "/" + id);
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        setEvent(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 animate-pulse">Loading…</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!event) {
    return <p className="text-center mt-10">No event found.</p>;
  }

  return (
    <div className="bg-[#faf8f4] dark:bg-gray-900 transition-colors duration-300">
      <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden text-center">
        <img
          src={event.img}
          alt={event.title}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

        <h1 className="text-white text-4xl font-bold z-20 absolute bottom-20 left-10">
          {event.title}
        </h1>

        <div className="absolute bottom-6 left-10 bg-[rgb(212,175,55)] z-20 text-[rgb(44,51,51)] text-lg font-bold rounded-2xl p-2 px-4 shadow-2xl">
          {event.location}
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            About {event.title}
          </h2>

          <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
            <p>{event.description}</p>
          </div>
        </div>

        <div className="md:col-span-1 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-lg h-fit">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Booking Details
          </h3>

          <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <FaDollarSign className="w-5 h-5" />
              <span>{event.entryFee} EGP</span>
            </div>

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-5 h-5" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="w-5 h-5" />
              <span>{event.openingHours.from} - {event.openingHours.to}</span>
            </div>

            <div className="flex items-center gap-2">
              <CiLocationOn className="w-5 h-5" />
              <span>{formatDate(event.date)}</span>
            </div>
          </div>

          <Button
            onClick={() =>
              navigate("/checkout", {
                state: { event },
              })
            }
            className="w-full mt-6 transition duration-500 font-bold text-lg text-black dark:text-white hover:bg-amber-500 bg-[rgb(232,213,183)] dark:bg-[rgb(35,45,45)]"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
