import Classroom from "@/components/Classroom";
import DashboardTopbar from "@/components/DashboardTopbar";
import React from "react";

const page = () => {
  return (
    <div className="w-full px-4">
      <DashboardTopbar />
      <Classroom />
    </div>
  );
};

export default page;
