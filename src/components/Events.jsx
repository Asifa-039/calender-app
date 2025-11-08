import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const Events = () => {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    const future = saved.filter((e) => e.type === "upcoming");
    setUpcoming(future);
  }, []);

  const deleteEvent = (title, date) => {
    const saved = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    const updated = saved.filter(
      (e) => e.title !== title || new Date(e.date).toDateString() !== date
    );
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
    setUpcoming(updated.filter((e) => e.type === "upcoming"));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
      {upcoming.length === 0 ? (
        <p className="text-gray-500">No upcoming events.</p>
      ) : (
        <ul className="space-y-2">
          {upcoming.map((e, i) => (
            <li
              key={i}
              className="p-3 border rounded-lg bg-green-50 text-green-700 flex justify-between items-center"
            >
              <span>{e.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {new Date(e.date).toDateString()}
                </span>
                <Trash2
                  size={16}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() =>
                    deleteEvent(e.title, new Date(e.date).toDateString())
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
