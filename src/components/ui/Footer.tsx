"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-8 p-4 w-full text-center bg-gray-900 text-white rounded-lg shadow-lg ">
      <p className="text-lg font-semibold">Nikita Sharma</p>
      <div className="flex justify-center gap-5 mt-2">
        <Link
          href="https://github.com/Nikita110602"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/nikita-a339b119b/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaLinkedin size={24} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
