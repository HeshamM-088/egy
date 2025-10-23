import React from "react";
import TeamMemberCard from "../../components/teamMember/TeamMemberCard";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import photo from "/OurMission.jpg";

const teamMembers = [
  {
    name: "Ashraf Wael",
    role: "Front-end Developer",
    socials: {
      gmail: "mailto:Z01022510736@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/ashraf-wael-1b42242bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    imageUrl: "/Avatars/logo5.png",
  },
  {
    name: "Omar Iraqii",
    role: "Front-end Developer",
    socials: {
      gmail: "mailto:omariraqii415@gmail.com",
      linkedin: "https://www.linkedin.com/in/omar-iraqi-0a25aa247",
    },
    imageUrl: "/Avatars/logo1.png",
  },

  {
    name: "Khalid Samy",
    role: "Front-end Developer",
    socials: {
      gmail: "mailto:khalidsamy1231@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/khalid-samy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    imageUrl: "/Avatars/logo4.png",
  },

  {
    name: "Yasmin Awod",
    role: "Front-end Developer",
    socials: {
      gmail: "mailto:jessywod44@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/yasmin-awad-419876287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    imageUrl: "/Avatars/logo2.png",
  },
  {
    name: "Sama osama",
    role: "Front-end Developer",
    socials: {
      gmail: "mailto:samaosma2005@gmail.com",
      linkedin: "https://www.linkedin.com/in/sama-osama-8b1a67298/",
    },
    imageUrl: "/Avatars/logo3.png",
  },
];
//animation for OurMission photo
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
//animation for team cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
//animation for every card
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AboutUs() {
  return (
    <div className="min-h-screen w-full   bg-[#DEDED1]  dark:bg-gray-900 mb-1 transition-colors duration-300">
      <motion.div
        className="bg-teal-600 text-white text-center py-20 w-full dark:bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-4">About EGY-Guide</h1>
        <p className="text-xl">
          Your trusted companion for discovering the wonders of Egypt
        </p>
      </motion.div>
      <div className="container mx-auto p-8">
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1B3C53] dark:text-[#D2C1B6]">
                Our Mission
              </h1>
              <p className="text-lg text-[#456882] dark:text-[#C5C7BC] max-w-3xl mx-auto">
                EGY-Guide was founded with a passionate mission to connect
                travelers from around the world with the incredible heritage,
                culture, and natural beauty of Egypt. We believe that every
                visitor should have access to authentic experiences and expert
                guidance. Our platform brings together the best destinations,
                cultural events, and local insights to help you plan an
                unforgettable journey through one of the world's most
                fascinating countries. Whether you're exploring ancient
                monuments, diving in the Red Sea, or experiencing local
                festivals, EGY-Guide is here to make your Egyptian adventure
                seamless and memorable.
              </p>
            </div>
            <div>
              <img
                src={photo}
                alt="photo"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-teal-500 dark:text-teal-400" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Authenticity
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We provide genuine, off-the-beaten-path experiences that reflect
                the true culture and spirit of Egypt.
              </p>
            </div>

            <div>
              <HeartIcon className="w-12 h-12 mx-auto mb-4 text-teal-500 dark:text-teal-400" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Passion
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our team is driven by a deep love for Egypt's history and
                heritage, and we're excited to share it.
              </p>
            </div>

            <div>
              <UsersIcon className="w-12 h-12 mx-auto mb-4 text-teal-500 dark:text-teal-400" />
              <h3 className="text-2xl font-bold mb-2 dark:text-white">
                Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We aim to build a global community of travelers connected by
                their shared love for exploration and discovery.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
            “Meet the people behind the vision — turning Egypt’s landmarks into
            a digital journey.”
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-8 "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member) => (
            <motion.div key={member.name} variants={cardVariants}>
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
                socials={member.socials}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
export default AboutUs;
