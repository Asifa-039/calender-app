import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const CompletedEvents = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    const past = saved.filter((e) => e.type === "completed");
    setCompleted(past);
  }, []);

  const deleteEvent = (title, date) => {
    const saved = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    const updated = saved.filter(
      (e) => e.title !== title || new Date(e.date).toDateString() !== date
    );
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
    setCompleted(updated.filter((e) => e.type === "completed"));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Completed Events</h2>
      {completed.length === 0 ? (
        <p className="text-gray-500">No completed events.</p>
      ) : (
        <ul className="space-y-2">
          {completed.map((e, i) => (
            <li
              key={i}
              className="p-3 border rounded-lg bg-gray-100 text-gray-700 flex justify-between items-center line-through"
            >
              <span>{e.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
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

export default CompletedEvents;
