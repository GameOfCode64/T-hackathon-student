import React from "react";
import { Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Lesson { id: number; name: string; completed: boolean; }
interface Level { id: number; name: string; completed: boolean; lessons: Lesson[]; }
interface LevelProgressProps { levels: Level[]; currentLevel: Level; courseSlug: string; }

const LevelProgress: React.FC<LevelProgressProps> = ({ levels, currentLevel, courseSlug }) => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg flex flex-col gap-6">
      <h2 className="text-white font-bold text-lg">Your Levels</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {levels?.length > 0 ? (
          levels.map((level) => (
            <div key={level.id} className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg
              ${level.completed ? "bg-emerald-400/80" : "bg-gray-700/60"} hover:scale-105 transition-transform duration-200 cursor-pointer`}>
              <span className="text-white font-bold text-lg">{level.name}</span>
              {level.completed ? <CheckCircle className="w-6 h-6 text-white mt-2" /> : <Lock className="w-6 h-6 text-gray-300 mt-2" />}
            </div>
          ))
        ) : <p className="text-white">No levels available</p>}
      </div>

      <div className="mt-6">
        <h3 className="text-white font-semibold text-lg mb-2">Lessons in {currentLevel.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentLevel.lessons?.length > 0 ? (
            currentLevel.lessons.map((lesson) => (
              <Link key={lesson.id} href={lesson.completed ? `/courses/${courseSlug}/lesson-${lesson.id}` : "#"}>
                <div className={`flex items-center justify-between rounded-xl p-4 shadow-md cursor-pointer transition-colors duration-200
                  ${lesson.completed ? "bg-purple-600/70 hover:bg-purple-500" : "bg-gray-700/60 hover:bg-gray-600 pointer-events-none"}`}>
                  <span className="text-white font-semibold">{lesson.name}</span>
                  {lesson.completed ? <CheckCircle className="w-5 h-5 text-white opacity-80" /> : <Lock className="w-5 h-5 text-gray-300 opacity-80" />}
                </div>
              </Link>
            ))
          ) : <p className="text-white">No lessons available</p>}
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;
