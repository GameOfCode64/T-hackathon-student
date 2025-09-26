'use client'
import React, { useState, useEffect } from 'react';
import { Star, Lock, Play, Trophy, CheckCircle, Zap, Crown, Gift, Target, BookOpen, Brain, ArrowLeft } from 'lucide-react';

interface LevelData {
  id: number;
  title: string;
  subtitle: string;
  stars: number;
  completed: boolean;
  unlocked: boolean;
  score: number;
  difficulty: string;
  xp: number;
  icon: string;
}

interface UserStats {
  totalStars: number;
  streak: number;
  level: number;
  xp: number;
}

const LevelProgress: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [particles, setParticles] = useState<any[]>([]);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const [currentSubject] = useState("Mathematics");
  const [userStats] = useState<UserStats>({
    totalStars: 10,
    streak: 3,
    level: 12,
    xp: 2450
  });

  const levels: LevelData[] = [
    { id: 1, title: "Basic Addition", subtitle: "Master the basics", stars: 3, completed: true, unlocked: true, score: 2450, difficulty: "Easy", xp: 100, icon: "➕" },
    { id: 2, title: "Subtraction Fun", subtitle: "Take it away", stars: 2, completed: true, unlocked: true, score: 1850, difficulty: "Easy", xp: 120, icon: "➖" },
    { id: 3, title: "Times Tables", subtitle: "Multiply your skills", stars: 3, completed: true, unlocked: true, score: 2890, difficulty: "Medium", xp: 150, icon: "✖️" },
    { id: 4, title: "Division Magic", subtitle: "Split the difference", stars: 1, completed: true, unlocked: true, score: 1200, difficulty: "Medium", xp: 180, icon: "➗" },
    { id: 5, title: "Fractions", subtitle: "Parts of a whole", stars: 0, completed: false, unlocked: true, score: 0, difficulty: "Medium", xp: 200, icon: "🍰" },
    { id: 6, title: "Decimals", subtitle: "Point precision", stars: 0, completed: false, unlocked: false, score: 0, difficulty: "Hard", xp: 250, icon: "🎯" },
    { id: 7, title: "Percentages", subtitle: "100% focused", stars: 0, completed: false, unlocked: false, score: 0, difficulty: "Hard", xp: 300, icon: "📊" },
    { id: 8, title: "Algebra Intro", subtitle: "Unknown variables", stars: 0, completed: false, unlocked: false, score: 0, difficulty: "Hard", xp: 350, icon: "🔤" },
    { id: 9, title: "Geometry", subtitle: "Shapes and angles", stars: 0, completed: false, unlocked: false, score: 0, difficulty: "Expert", xp: 400, icon: "📐" },
    { id: 10, title: "Advanced Math", subtitle: "Master level", stars: 0, completed: false, unlocked: false, score: 0, difficulty: "Expert", xp: 500, icon: "🧠" },
  ];

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          color: ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
          duration: Math.random() * 10 + 10
        });
      }
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  const getRandomColor = (index: number): string => {
    const colors = [
      'from-pink-500 via-pink-400 to-pink-600',
      'from-blue-500 via-blue-400 to-blue-600', 
      'from-green-500 via-green-400 to-green-600',
      'from-purple-500 via-purple-400 to-purple-600',
      'from-orange-500 via-orange-400 to-orange-600',
      'from-red-500 via-red-400 to-red-600',
      'from-yellow-500 via-yellow-400 to-yellow-600',
      'from-indigo-500 via-indigo-400 to-indigo-600',
      'from-teal-500 via-teal-400 to-teal-600',
      'from-rose-500 via-rose-400 to-rose-600'
    ];
    return colors[index % colors.length];
  };

  const getDifficultyColor = (difficulty: string): string => {
    const colors: { [key: string]: string } = {
      'Easy': 'text-green-500 bg-green-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'Hard': 'text-orange-600 bg-orange-100',
      'Expert': 'text-red-600 bg-red-100'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-100';
  };

  const getLevelPosition = (index: number) => {
    const zigzag = Math.floor(index / 3) % 2 === 0;
    const row = Math.floor(index / 3);
    const col = index % 3;
    
    if (zigzag) {
      return {
        left: `${15 + col * 30}%`,
        top: `${120 + row * 140}px`
      };
    } else {
      return {
        left: `${15 + (2 - col) * 30}%`,
        top: `${120 + row * 140}px`
      };
    }
  };

  const createStarBurst = (level: LevelData) => {
    setShowAchievement(`Level ${level.id} completed!`);
    setTimeout(() => setShowAchievement(null), 3000);
  };

  const renderStars = (stars: number, maxStars: number = 3) => {
    return (
      <div className="flex space-x-1 mt-2">
        {Array.from({ length: maxStars }, (_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 transition-all duration-300 ${
              index < stars 
                ? 'fill-yellow-400 text-yellow-400 animate-pulse' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderPath = () => {
    const pathElements = [];
    for (let i = 0; i < levels.length - 1; i++) {
      const currentPos = getLevelPosition(i);
      const nextPos = getLevelPosition(i + 1);
      
      pathElements.push(
        <svg
          key={`path-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${parseFloat(currentPos.left)}%`,
            top: `${parseFloat(currentPos.top) + 50}px`,
            width: '200px',
            height: '140px',
            zIndex: 1
          }}
        >
          <defs>
            <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={levels[i + 1].unlocked ? "#10b981" : "#6b7280"} />
              <stop offset="100%" stopColor={levels[i + 1].unlocked ? "#3b82f6" : "#9ca3af"} />
            </linearGradient>
          </defs>
          <path
            d={`M 50 0 Q 100 70 ${parseFloat(nextPos.left) - parseFloat(currentPos.left) > 0 ? 150 : -50} 120`}
            stroke={`url(#gradient-${i})`}
            strokeWidth="6"
            fill="none"
            strokeDasharray={levels[i + 1].unlocked ? "0" : "12,8"}
            className={levels[i + 1].unlocked ? "drop-shadow-lg" : "opacity-60"}
            strokeLinecap="round"
          />
          {levels[i + 1].unlocked && (
            <circle r="3" fill="#10b981" className="animate-ping">
              <animateMotion dur="3s" repeatCount="indefinite">
                <path d={`M 50 0 Q 100 70 ${parseFloat(nextPos.left) - parseFloat(currentPos.left) > 0 ? 150 : -50} 120`} />
              </animateMotion>
            </circle>
          )}
        </svg>
      );
    }
    return pathElements;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Header matching your design */}
      <div className="w-full h-[70px] px-20 shadow-md flex items-center bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-normal">
          <ArrowLeft className="cursor-pointer mr-2 text-white hover:text-purple-200 transition-colors" />
          <h3 className="capitalize font-semibold text-white text-lg">{currentSubject}</h3>
        </div>
        
        {/* Additional header stats */}
        <div className="ml-auto flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Level {userStats.level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-white font-medium">{userStats.totalStars}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-white font-medium">{userStats.streak} day streak</span>
          </div>
        </div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-bounce opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.id * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Achievement popup */}
      {showAchievement && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in duration-500">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-2xl text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-white animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2">{showAchievement}</h3>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3].map((star) => (
                <Star key={star} className="w-6 h-6 fill-white text-white animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Level progression map */}
      <div className="relative px-4 pb-32" style={{ minHeight: '1000px' }}>
        {renderPath()}
        
        {levels.map((level, index) => {
          const position = getLevelPosition(index);
          
          return (
            <div
              key={level.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={position}
            >
              <div
                className={`relative group cursor-pointer transition-all duration-500 hover:scale-125 ${
                  selectedLevel === level.id ? 'scale-125' : ''
                }`}
                onClick={() => {
                  if (level.unlocked) {
                    setSelectedLevel(selectedLevel === level.id ? null : level.id);
                  }
                }}
              >
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl transition-all duration-500 border-4 ${
                    level.unlocked
                      ? level.completed
                        ? `bg-gradient-to-br ${getRandomColor(index)} border-green-400 shadow-green-400/50`
                        : `bg-gradient-to-br ${getRandomColor(index)} border-yellow-400 animate-pulse shadow-yellow-400/50`
                      : 'bg-gradient-to-br from-gray-600 to-gray-800 border-gray-500 cursor-not-allowed shadow-gray-600/50'
                  }`}
                >
                  {level.unlocked ? (
                    level.completed ? (
                      <CheckCircle className="w-10 h-10 animate-bounce" />
                    ) : (
                      <span className="text-3xl">{level.icon}</span>
                    )
                  ) : (
                    <Lock className="w-10 h-10" />
                  )}
                </div>

                {level.unlocked && !level.completed && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-ping opacity-30"></div>
                )}

                {selectedLevel === level.id && level.unlocked && (
                  <div className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 w-72 z-30 animate-in slide-in-from-top duration-500">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{level.icon}</div>
                      <h3 className="font-bold text-gray-800 text-xl mb-1">{level.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{level.subtitle}</p>
                      
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getDifficultyColor(level.difficulty)}`}>
                        {level.difficulty}
                      </div>

                      {level.completed ? (
                        <>
                          {renderStars(level.stars)}
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Score:</span>
                              <span className="font-bold text-purple-600">{level.score.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">XP Earned:</span>
                              <span className="font-bold text-blue-600">+{level.xp}</span>
                            </div>
                          </div>
                          <button 
                            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium flex items-center mx-auto space-x-2 transition-all duration-300 transform hover:scale-105"
                            onClick={() => createStarBurst(level)}
                          >
                            <Play className="w-5 h-5" />
                            <span>Replay Level</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-center space-x-1 mt-2 mb-4">
                            {[1, 2, 3].map((star) => (
                              <Star key={star} className="w-5 h-5 text-gray-300" />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600 mb-4">
                            Earn up to +{level.xp} XP
                          </div>
                          <button 
                            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 rounded-full font-medium flex items-center mx-auto space-x-2 transition-all duration-300 transform hover:scale-105"
                            onClick={() => createStarBurst(level)}
                          >
                            <Play className="w-5 h-5" />
                            <span>Start Adventure</span>
                          </button>
                        </>
                      )}
                    </div>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-12 border-r-12 border-b-12 border-transparent border-b-white filter drop-shadow-lg"></div>
                    </div>
                  </div>
                )}

                {level.completed && (
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-1 bg-black bg-opacity-30 rounded-full px-3 py-1 backdrop-blur-sm">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 transition-all duration-300 ${
                            star <= level.stars 
                              ? 'fill-yellow-400 text-yellow-400 animate-pulse' 
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="absolute -top-3 -right-3 bg-white text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                  {level.id}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom progress panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-lg border-t border-white/20 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between text-white mb-3">
                <span className="font-medium flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Learning Progress</span>
                </span>
                <span className="text-lg font-bold">{levels.filter(l => l.completed).length}/{levels.length}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4 mb-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${(levels.filter(l => l.completed).length / levels.length) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex justify-between text-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Trophy className="w-5 h-5" />
                    <span className="font-bold text-lg">{levels.reduce((sum, level) => sum + level.stars, 0)}</span>
                  </div>
                  <span className="text-xs text-white/70">Stars Earned</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold text-lg">{levels.filter(l => l.completed).length}</span>
                  </div>
                  <span className="text-xs text-white/70">Completed</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1 text-blue-400">
                    <Brain className="w-5 h-5" />
                    <span className="font-bold text-lg">{levels.filter(l => l.unlocked && !l.completed).length}</span>
                  </div>
                  <span className="text-xs text-white/70">Available</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Gift className="w-5 h-5" />
                <span>Daily Reward</span>
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Power-ups</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;