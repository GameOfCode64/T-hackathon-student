import Sidebar from "@/components/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-row gap-5">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
