import React, { useMemo, useState } from "react";
import { useCalendar } from "../context/CalendarContext";
import AddEventModal from "./AddEventModal";
import { Trash2, ChevronLeft, ChevronRight, CalendarDays, RotateCcw } from "lucide-react";

const Calendar = () => {
  const {
    events,
    setEvents,
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,
  } = useCalendar();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let i = 1; i <= totalDays; i++) arr.push(i);
    return arr;
  }, [month, year]);

  const handleAddEvent = (newEvent) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(newEvent.date);
    eventDate.setHours(0, 0, 0, 0);

    const type = eventDate < today ? "completed" : "upcoming";
    setEvents((prev) => [...prev, { ...newEvent, type }]);
  };

  const handleDeleteEvent = (date, title) => {
    setEvents((prev) =>
      prev.filter(
        (event) =>
          event.date.toDateString() !== date.toDateString() ||
          event.title !== title
      )
    );
  };

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setViewMode("month");
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const date = new Date(year, month, day);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const getEventsForDay = (day) => {
    const date = new Date(year, month, day);
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const currentDayEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="p-8 transition-all duration-300">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to CALENDAR</h1>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
        >
          <ChevronLeft size={18} /> Prev
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {monthName} {year}
          </h2>
          <p className="text-sm text-gray-500">
            {viewMode === "month"
              ? "Month View"
              : `Day View - ${selectedDate.toDateString()}`}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleToday}
            className="flex items-center gap-1 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition"
          >
            <RotateCcw size={16} /> Today
          </button>

          <button
            onClick={() =>
              setViewMode((prev) => (prev === "month" ? "day" : "month"))
            }
            className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
          >
            <CalendarDays size={18} />
            {viewMode === "month" ? "Day View" : "Month View"}
          </button>

          <button
            onClick={handleNextMonth}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Month View */}
      {viewMode === "month" && (
        <div className="grid grid-cols-7 gap-4 text-center">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d} className="font-semibold text-gray-600 uppercase text-sm">
              {d}
            </div>
          ))}
          {days.map((day, i) => {
            const dayEvents = day ? getEventsForDay(day) : [];
            const isSelected =
              selectedDate &&
              day &&
              selectedDate.toDateString() ===
                new Date(year, month, day).toDateString();
            return (
              <div
                key={i}
                onClick={() => handleDateClick(day)}
                className={`min-h-[100px] border rounded-lg p-2 text-left cursor-pointer transition ${
                  day
                    ? `${
                        dayEvents.length > 0 || isSelected
                          ? "bg-blue-100 shadow-md"
                          : "hover:bg-blue-100"
                      }`
                    : "bg-transparent cursor-default"
                }`}
              >
                {day && <div className="font-medium">{day}</div>}
                {dayEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className={`text-xs px-2 py-1 rounded mt-1 ${
                      event.type === "upcoming"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700 line-through"
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Day View */}
      {viewMode === "day" && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-md">
          <h3 className="text-xl font-semibold mb-2">
            Events on {selectedDate.toDateString()}
          </h3>
          {currentDayEvents.length === 0 ? (
            <p className="text-gray-500">No events for this day</p>
          ) : (
            currentDayEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm mb-2"
              >
                <span>{event.title}</span>
                <Trash2
                  size={16}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDeleteEvent(event.date, event.title)}
                />
              </div>
            ))
          )}
        </div>
      )}

      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;
