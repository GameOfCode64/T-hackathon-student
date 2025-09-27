"use client";
import React from "react";
import { Search, Play, ArrowRight, BookOpen, Users, Award } from "lucide-react";
import stu from "@/public/sudent.jpg";
import Image from "next/image";
import Link from "next/link";
const ModernSchoolLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-50 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Learn Karo
            </div>
            <ul className="hidden md:flex gap-8 text-lg">
              <li>
                <a
                  href="#home"
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="hover:text-cyan-400 transition-colors duration-300"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-pink-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <Link href={"/sign-in"}>
                <button className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300">
                  Sign In
                </button>
              </Link>
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-6">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Next-Gen Learning Platform</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Learn{" "}
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Without
                </span>{" "}
                Limits
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                Transform your future with our cutting-edge online education
                platform. Join thousands of students mastering new skills every
                day.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={"/sign-in"}>
                  <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1 transition-all duration-300">
                    <Play className="w-5 h-5" />
                    Start Learning
                  </button>
                </Link>
                <Link href={"/sign-in"}>
                  <button className="flex items-center gap-3 px-8 py-4 border border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300">
                    Explore Courses
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Visual Elements */}
            <div className="relative h-[600px]">
              {/* Floating Cards Grid */}
              <div className="grid grid-cols-3 gap-4 h-full">
                {/* Column 1 */}
                <div className="flex flex-col gap-4 pt-8">
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-400 to-red-600 p-6 h-40 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <Image
                      src={stu}
                      alt="Student"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="relative z-10">
                      <BookOpen className="w-6 h-6 mb-2 text-white" />
                      <p className="text-sm text-white font-medium">
                        Interactive Lessons
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 to-pink-600 p-6 h-48 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face"
                      alt="Student"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="relative z-10">
                      <Users className="w-6 h-6 mb-2 text-white" />
                      <p className="text-sm text-white font-medium">
                        Study Groups
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-4">
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 p-6 h-52 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face"
                      alt="Student"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="relative z-10">
                      <Award className="w-6 h-6 mb-2 text-white" />
                      <p className="text-sm text-white font-medium">
                        Get Certified
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 h-44 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                      alt="Student"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="relative z-10 flex flex-col justify-end h-full">
                      <p className="text-sm text-white font-medium">
                        Expert Mentors
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-4 pt-12">
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-purple-700 p-6 h-36 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                      alt="Student"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-400 to-cyan-600 p-6 h-56 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face"
                      alt="Student"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-20 -right-4 w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute top-40 -left-6 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-32 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
              <div
                className="absolute bottom-60 -left-4 w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <div className="text-gray-400">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  1,200+
                </div>
                <div className="text-gray-400">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  95%
                </div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernSchoolLanding;
