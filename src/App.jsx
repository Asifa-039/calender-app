import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import CompletedEvents from "./components/CompletedEvents";
import { CalendarProvider } from "./context/CalendarContext";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-50 min-h-screen">
          {/* 💡 Wrap everything here so data stays global */}
          <CalendarProvider>
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/events" element={<Events />} />
              <Route path="/completed" element={<CompletedEvents />} />
            </Routes>
          </CalendarProvider>
        </div>
      </div>
    </Router>
  );
};

export default App;
