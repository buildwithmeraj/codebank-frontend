import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 xl:px-16">
        <Outlet />
      </main>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Footer />
    </div>
  );
}
