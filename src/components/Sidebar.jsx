import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CalendarCheck2, CheckCircle } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 font-medium rounded-lg px-3 py-2 transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-100 text-blue-700 shadow-sm"
        : "text-blue-800 hover:bg-blue-100 hover:text-blue-700"
    }`;

  return (
    <div className="w-64 bg-blue-50 h-screen flex flex-col justify-between p-6 border-r border-blue-100">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-blue-600 tracking-tight">
          CALAEDAR
        </h1>

        <nav className="flex flex-col space-y-4">
          {/* 🏠 Home */}
          <Link to="/" className={linkClasses("/")}>
            <Home size={20} />
            Home
          </Link>

          {/* 📅 Upcoming Events */}
          <Link to="/events" className={linkClasses("/events")}>
            <CalendarCheck2 size={20} />
            Upcoming Events
          </Link>

          {/* ✅ Completed Events */}
          <Link to="/completed" className={linkClasses("/completed")}>
            <CheckCircle size={20} />
            Completed Events
          </Link>
        </nav>
      </div>

      <footer className="text-xs text-blue-500 text-center mt-auto">
        © 2025 CALENDAR. All rights reserved.
      </footer>
    </div>
  );
};

export default Sidebar;
