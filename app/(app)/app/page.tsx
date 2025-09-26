import Classroom from "@/components/Classroom";
import DashboardTopbar from "@/components/DashboardTopbar";
import { ClockFading } from "lucide-react";
import React from "react";

const page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full py-2 px-4 ">

        <DashboardTopbar />
    
      <div className="flex flex-col">
        <h1 className="flex items-center gap-2 font-semibold text-lg text-emerald-700 mb-8">
          <ClockFading className="text-emerald-500" /> Recent
        </h1>
        <Classroom />
      </div>
    </div>
  );
};

export default page;
