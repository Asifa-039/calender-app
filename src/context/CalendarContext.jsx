import React, { createContext, useContext, useEffect, useState } from "react";

// Step 1️⃣ Create a Context
const CalendarContext = createContext();

// Step 2️⃣ Create a custom hook for easier use
export const useCalendar = () => useContext(CalendarContext);

// Step 3️⃣ Create a Provider that stores and shares the data globally
export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  // 🧠 Load data once from localStorage (this happens only once)
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      setEvents(
        JSON.parse(savedEvents).map((e) => ({
          ...e,
          date: new Date(e.date),
        }))
      );
    }

    const savedCurrent = localStorage.getItem("calendarCurrentDate");
    const savedSelected = localStorage.getItem("calendarSelectedDate");
    const savedView = localStorage.getItem("calendarViewMode");

    if (savedCurrent) setCurrentDate(new Date(savedCurrent));
    if (savedSelected) setSelectedDate(new Date(savedSelected));
    if (savedView) setViewMode(savedView);
  }, []);

  // 💾 Save changes back to localStorage
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
    localStorage.setItem("calendarCurrentDate", currentDate.toISOString());
    localStorage.setItem("calendarSelectedDate", selectedDate.toISOString());
    localStorage.setItem("calendarViewMode", viewMode);
  }, [events, currentDate, selectedDate, viewMode]);

  // Step 4️⃣ Provide data to all children
  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        currentDate,
        setCurrentDate,
        selectedDate,
        setSelectedDate,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
