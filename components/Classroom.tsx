"use client";

import Image from "next/image";
import Link from "next/link";
import { SubjectData } from "@/data/subjectData";
import React from "react";
import { Progress } from "@/components/ui/progress"

const Classroom = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {SubjectData.map((subject) => (
        <Link
          key={subject.id}
          href={`/${subject.link}`}
          className="group bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300"
        >
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={subject.imageUrl}
              alt={subject.subject}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col  mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
              {subject.subject}
            </h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              {subject.description}
            </p>
            <h3 className="mt-3 my-2">Progress <span className="text-emerald-500">{subject.courseCompleted}%</span></h3>
            <div className="w-full">
              <Progress  value={subject.courseCompleted} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Classroom;
