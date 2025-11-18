import React from "react";
import { FileText, Edit, Play, CodeXml } from "lucide-react"; // Lucide icons

const Home = () => {
  return (
    <div className="">
      <title>Home - CodeBank</title>

      <section className="bg-base-100 text-white py-20 rounded-xl hero-bg">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to CodeBank</h1>
          <p className="text-xl mb-8">
            Your personal repository for code snippets and programming
            knowledge.
          </p>
          <div className="hero-btn-bg p-6">
            <a href="/profile" className="btn btn-primary">
              <Play size={20} />
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">What can you do?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-6 rounded-2xl transition-all hover:scale-105 duration-300 shadow-sm hover:shadow-lg bg-base-200">
              <div className="flex justify-center text-blue-500 mb-4">
                <CodeXml size={60} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Store Code Snippets
              </h3>
              <p className="text-lg">
                Save your most used code snippets across various programming
                languages.
              </p>
            </div>
            <div className="p-6 rounded-2xl transition-all hover:scale-105 duration-300 shadow-sm hover:shadow-lg bg-base-200">
              <div className="flex justify-center text-blue-500 mb-4">
                <FileText size={60} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Organize by Categories
              </h3>
              <p className="text-lg">
                Organize your snippets into categories for easy access.
              </p>
            </div>
            <div className="p-6 rounded-2xl transition-all hover:scale-105 duration-300 shadow-sm hover:shadow-lg bg-base-200">
              <div className="flex justify-center text-blue-500 mb-4">
                <Edit size={60} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Edit and Delete</h3>
              <p className="text-lg">
                Easily modify or remove snippets as you go, keeping your
                collection fresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 py-16 rounded-xl">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Getting Started</h2>
          <p className="text-lg mb-6">
            To get started, simply log in using your Google account and begin
            saving your code snippets. You can create categories to organize
            your snippets by language, project, or any system that works for
            you.
          </p>
          <a href="/profile" className="btn btn-primary">
            <Play size={20} className="inline-block" />
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
