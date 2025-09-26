import Sidebar from "@/components/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-row space-x-4">
        <div className="w-[360px]">
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
