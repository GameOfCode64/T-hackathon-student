"use client";

import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  User,
  Trophy,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Links = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "Courses", href: "/app/courses", icon: BookOpen },
  { name: "Achievements", href: "/app/achievements", icon: Trophy },
  { name: "Profile", href: "/app/profile", icon: User },
  { name: "Settings", href: "/app/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-[290px] shadow-md flex justify-center py-8 bg-white z-50">
      <div className="flex flex-col w-full px-4">
        {/* Logo / Brand */}
        <div className="text-2xl flex items-center justify-center font-bold mb-10">
          <div className="inline mr-2 p-3 bg-emerald-500/10 text-emerald-500 rounded-xl shadow-sm">
            <GraduationCap size={20} />
          </div>
          <Link href="/app" className="tracking-wide">
            Learn Karo
          </Link>
        </div>

        {/* Links */}
        <div className="space-y-2">
          {Links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all 
                ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-500 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-emerald-500"
                }`}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
