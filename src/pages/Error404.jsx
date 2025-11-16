import React from "react";
import Header from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <title>Error 404 - CityFix</title>
      <Header />
      <main className="flex-1 px-[3%] py-[1%] flex items-center justify-center h-[70vh] flex-col gap-4 pt-4">
        <div className="mockup-browser border-primary border max-w-xl rounded-lg">
          <div className="mockup-browser-toolbar">
            <div className="input">{window.location.href}</div>
          </div>
          <div className="grid place-content-center place-items-center border-t border-primary h-80 p-6">
            <div className="text-center font-semibold text-xl lg:text-2xl">
              <span className="text-error">OOPS!</span> Page Not Found.
            </div>
            <div className="lg:text-xl text-center">
              The Page you are looking for cannot be found on the server. But
              don't worry, you can always go back to the{" "}
              <Link to="/" className="font-semibold btn btn-primary mt-4">
                Home Page
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;
