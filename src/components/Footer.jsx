import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-neutral-primary-soft rounded-base shadow-xs border-t-2 border-base-300">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-center mb-4">
          <Link className="text-3xl flex items-center gap-1 font-bold" to="/">
            <img src={logo} alt="logo" className="w-10" />
            <span>
              Code<span className="text-[#525CFA]">Bank</span>
            </span>
          </Link>
        </div>
        <span className="block text-sm text-body text-center">
          © {new Date().getFullYear()}{" "}
          <a href="https://meraj.pro/" className="hover:underline">
            Merajul Islam
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
