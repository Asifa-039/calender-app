import React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const Topbar = ({ onAddClick }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left side */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Calendar</h2>
        <p className="text-sm text-gray-500">Full Event Schedule</p>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-3">
        {/* <button className="flex items-center gap-1 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition">
          <ChevronLeft size={16} /> Prev
        </button>
        <button className="flex items-center gap-1 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition">
          Next <ChevronRight size={16} />
        </button> */}
        <button
          onClick={onAddClick}
          className="ml-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Add Event
        </button>
      </div>
    </div>
  );
};

export default Topbar;
