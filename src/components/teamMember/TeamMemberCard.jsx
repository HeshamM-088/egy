import React from "react";
import { GmailIcon, LinkedInIcon } from "../SocialIcons/SocialIcons";

function TeamMemberCard({ name, role, imageUrl, socials }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 
      shadow-lg rounded-lg p-6 text-center
      transition-transform duration-300 transform hover:scale-105 hover:shadow-xl min-w-[320px]"
    >
      <img
        src={imageUrl}
        alt={`Photo doesn't exist`}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{role}</p>

      {socials && (
        <div className="mt-4 flex justify-center gap-4">
          <a
            href={socials.gmail}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <GmailIcon />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <LinkedInIcon />
          </a>
        </div>
      )}
    </div>
  );
}

export default TeamMemberCard;
