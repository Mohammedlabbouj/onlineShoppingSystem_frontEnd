import React from "react";
import { Stat } from "../types/vendor"; // Adjust path if needed

interface StatCardProps {
  stat: Stat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const IconComponent = stat.icon; // Get the icon component

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex items-center space-x-4 border border-gray-100">
      <div className="flex-shrink-0">
        <IconComponent className="h-8 w-8 text-green-500" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{stat.title}</p>
        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
      </div>
    </div>
  );
};

export default StatCard;
