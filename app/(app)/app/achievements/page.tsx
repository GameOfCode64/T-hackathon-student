'use client';
import React, { useState } from 'react';
import { Trophy, Flame, Clock, Target, BookOpen, Zap, Star, Award, Calendar, Brain, Users, TrendingUp } from 'lucide-react';

const AchievementsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    // Streak Achievements
    {
      id: 1,
      title: "7-Day Study Streak",
      description: "Studied for 7 consecutive days",
      icon: Flame,
      category: "streaks",
      earned: true,
      earnedDate: "2024-09-20",
      progress: 100,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      rarity: "common"
    },
    {
      id: 2,
      title: "30-Day Study Warrior",
      description: "Maintained a 30-day study streak",
      icon: Flame,
      category: "streaks",
      earned: true,
      earnedDate: "2024-09-15",
      progress: 100,
      color: "text-red-500",
      bgColor: "bg-red-100",
      rarity: "rare"
    },
    {
      id: 3,
      title: "100-Day Champion",
      description: "Incredible 100-day study streak",
      icon: Flame,
      category: "streaks",
      earned: false,
      progress: 67,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      rarity: "legendary"
    },

    // Study Hours
    {
      id: 4,
      title: "Night Owl",
      description: "Studied for 10 hours in a single day",
      icon: Clock,
      category: "hours",
      earned: true,
      earnedDate: "2024-09-18",
      progress: 100,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      rarity: "uncommon"
    },
    {
      id: 5,
      title: "Study Marathon",
      description: "Accumulated 100 total study hours",
      icon: Clock,
      category: "hours",
      earned: true,
      earnedDate: "2024-09-10",
      progress: 100,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
      rarity: "rare"
    },
    {
      id: 6,
      title: "Time Master",
      description: "Reach 500 total study hours",
      icon: Clock,
      category: "hours",
      earned: false,
      progress: 72,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      rarity: "epic"
    },

    // Questions & Problems
    {
      id: 7,
      title: "Problem Solver",
      description: "Solved 100 practice questions",
      icon: Target,
      category: "questions",
      earned: true,
      earnedDate: "2024-09-22",
      progress: 100,
      color: "text-green-500",
      bgColor: "bg-green-100",
      rarity: "common"
    },
    {
      id: 8,
      title: "Quiz Master",
      description: "Achieved 95%+ accuracy on 10 quizzes",
      icon: Star,
      category: "questions",
      earned: true,
      earnedDate: "2024-09-19",
      progress: 100,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      rarity: "uncommon"
    },
    {
      id: 9,
      title: "Perfectionist",
      description: "Score 100% on 5 consecutive tests",
      icon: Award,
      category: "questions",
      earned: false,
      progress: 60,
      color: "text-pink-500",
      bgColor: "bg-pink-100",
      rarity: "rare"
    },

    // Course Completion
    {
      id: 10,
      title: "Course Conqueror",
      description: "Completed your first course",
      icon: BookOpen,
      category: "courses",
      earned: true,
      earnedDate: "2024-09-25",
      progress: 100,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
      rarity: "common"
    },
    {
      id: 11,
      title: "Multi-Disciplinary",
      description: "Complete courses in 3 different subjects",
      icon: Brain,
      category: "courses",
      earned: false,
      progress: 66,
      color: "text-violet-500",
      bgColor: "bg-violet-100",
      rarity: "uncommon"
    },

    // Speed & Efficiency
    {
      id: 12,
      title: "Speed Learner",
      description: "Complete a lesson in under 15 minutes",
      icon: Zap,
      category: "speed",
      earned: true,
      earnedDate: "2024-09-21",
      progress: 100,
      color: "text-amber-500",
      bgColor: "bg-amber-100",
      rarity: "common"
    },
    {
      id: 13,
      title: "Lightning Fast",
      description: "Answer 20 questions correctly in 5 minutes",
      icon: Zap,
      category: "speed",
      earned: false,
      progress: 45,
      color: "text-cyan-500",
      bgColor: "bg-cyan-100",
      rarity: "rare"
    },

    // Consistency
    {
      id: 14,
      title: "Early Bird",
      description: "Study before 8 AM for 7 days straight",
      icon: Calendar,
      category: "consistency",
      earned: true,
      earnedDate: "2024-09-16",
      progress: 100,
      color: "text-teal-500",
      bgColor: "bg-teal-100",
      rarity: "uncommon"
    },
    {
      id: 15,
      title: "Weekend Warrior",
      description: "Study on 10 consecutive weekends",
      icon: Calendar,
      category: "consistency",
      earned: false,
      progress: 30,
      color: "text-rose-500",
      bgColor: "bg-rose-100",
      rarity: "rare"
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Trophy },
    { id: 'streaks', label: 'Streaks', icon: Flame },
    { id: 'hours', label: 'Study Hours', icon: Clock },
    { id: 'questions', label: 'Questions', icon: Target },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'speed', label: 'Speed', icon: Zap },
    { id: 'consistency', label: 'Consistency', icon: Calendar }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalCount = achievements.length;
  const completionRate = Math.round((earnedCount / totalCount) * 100);

  const getRarityColor = (rarity: any) => {
    switch (rarity) {
      case 'common': return 'text-gray-500';
      case 'uncommon': return 'text-green-500';
      case 'rare': return 'text-blue-500';
      case 'epic': return 'text-purple-500';
      case 'legendary': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getRarityBorder = (rarity: any) => {
    switch (rarity) {
      case 'common': return 'border-gray-200';
      case 'uncommon': return 'border-green-200';
      case 'rare': return 'border-blue-200';
      case 'epic': return 'border-purple-200';
      case 'legendary': return 'border-yellow-200';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
          <p className="text-gray-600">Track your learning milestones and celebrate your progress!</p>
          
          {/* Stats Overview */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center">
                <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{earnedCount}</p>
                  <p className="text-sm text-gray-500">Achievements Earned</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                  <p className="text-sm text-gray-500">Completion Rate</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center">
                <Flame className="w-8 h-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">30</p>
                  <p className="text-sm text-gray-500">Current Streak</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`bg-white rounded-lg p-6 shadow-sm border-2 transition-transform hover:scale-105 ${
                  achievement.earned ? getRarityBorder(achievement.rarity) : 'border-gray-200'
                } ${achievement.earned ? '' : 'opacity-75'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${achievement.bgColor}`}>
                    <Icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-medium uppercase tracking-wide ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                    {achievement.earned && (
                      <div className="flex items-center mt-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {achievement.description}
                </p>

                {achievement.earned ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">
                      Completed!
                    </span>
                    <span className="text-xs text-gray-500">
                      {achievement.earnedDate}
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">
                        {achievement.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${achievement.color.replace('text', 'bg')}`}
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h3>
            <p className="text-gray-500">Start learning to unlock your first achievement!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsSection;