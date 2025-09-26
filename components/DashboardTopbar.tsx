import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardTopbar = () => {
  const currentCourse = "React for Beginners";
  return (
    <div className="flex h-[90px] items-center justify-between">
      {/* Left Section */}
      <div />
      <UserButton />
    </div>
  );
};

export default DashboardTopbar;
