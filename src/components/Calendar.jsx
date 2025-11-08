import React, { useState, useEffect } from "react";
import AddEventModal from "./AddEventModal.jsx";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    return saved;
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Add new event
  const addEvent = (newEvent) => {
    const today = new Date();
    const eventDate = new Date(newEvent.date);

    const eventType =
      eventDate < today.setHours(0, 0, 0, 0) ? "completed" : "upcoming";

    const updatedEvents = [
      ...events,
      { ...newEvent, type: eventType, id: Date.now() },
    ];

    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
  };

  const deleteEvent = (id) => {
    const updated = events.filter((event) => event.id !== id);
    setEvents(updated);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = [];
  const totalDays = daysInMonth(year, month);
  const startingDay = firstDayOfMonth(year, month);

  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push(new Date(year, month, i));
  }

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const formatDate = (date) => date.toISOString().split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  const handleDayClick = (date) => {
    setSelectedDate(formatDate(date));
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedDate(null);
              setShowModal(true);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Event
          </button>
          <button
            onClick={nextMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2 text-gray-700">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return (
              <div key={index} className="p-4 border rounded bg-gray-100"></div>
            );
          }

          const formatted = formatDate(date);
          const dayEvents = events.filter((event) => event.date === formatted);
          const isToday = formatted === today;

          return (
            <div
              key={index}
              onClick={() => handleDayClick(date)}
              className={`p-2 border rounded h-28 overflow-y-auto cursor-pointer transition ${
                isToday ? "bg-blue-100" : "hover:bg-blue-50"
              }`}
            >
              <div className="font-bold text-sm mb-1 text-gray-800">
                {date.getDate()}
              </div>

              {dayEvents.length > 0 ? (
                dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => e.stopPropagation()}
                    className={`relative text-xs p-1 mb-1 rounded text-white ${
                      event.type === "completed"
                        ? "bg-gray-500 line-through"
                        : "bg-green-500"
                    }`}
                  >
                    {event.title}
                    <br />
                    {event.startTime} - {event.endTime}
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="absolute top-0 right-1 text-[10px] text-white hover:text-red-300"
                    >
                      ❌
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-xs">No events</div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAdd={(newEvent) =>
            addEvent({ ...newEvent, date: selectedDate || newEvent.date })
          }
        />
      )}
    </div>
  );
}

export default Calendar;
