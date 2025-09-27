import AllSubjects from "@/components/AllSubjects";
import Classroom from "@/components/Classroom";
import DashboardTopbar from "@/components/DashboardTopbar";
import React from "react";

const page = () => {
  return (
    <div className="w-full px-4">
      <DashboardTopbar />
      <AllSubjects />
    </div>
  );
};

export default page;
