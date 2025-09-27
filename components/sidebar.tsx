'use client';
import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Award,
  User,
  Settings,
  Network,
  Calendar,
  Bell,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Target,
  TrendingUp,
  Clock,
  Download,
  Shield,
  Eye,
  Palette,
  Zap,
  Heart,
  MessageCircle,
  Star
} from 'lucide-react';

const StudentSidebar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTheme, setSelectedTheme] = useState('Default');

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true, href: '/app' },
    { icon: BookOpen, label: 'Courses', href: '/app/courses' },
    { icon: Network, label: 'Knowledge Graph', href: '/app/knowledge-graph' },
    { icon: Award, label: 'Achievements', href: '/app/achievements' },
    { icon: User, label: 'Profile', href: '/app/profile' },
    { icon: Settings, label: 'Settings', href: '/app/settings' }
  ];

  const studyStats = [
    { label: 'Study Streak', value: '12 days', icon: Zap, color: 'text-orange-500' },
    { label: 'Total Points', value: '2,450', icon: Star, color: 'text-yellow-500' },
    { label: 'Hours Today', value: '2.5h', icon: Clock, color: 'text-blue-500' },
    { label: 'Courses Active', value: '4', icon: BookOpen, color: 'text-green-500' }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Schedule Study', color: 'bg-blue-100 text-blue-600' },
    { icon: Target, label: 'Set Goals', color: 'bg-purple-100 text-purple-600' },
    { icon: TrendingUp, label: 'Progress Report', color: 'bg-green-100 text-green-600' },
    { icon: MessageCircle, label: 'Study Groups', color: 'bg-pink-100 text-pink-600' }
  ];

  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German'];
  const themes = ['Default', 'Ocean Blue', 'Forest Green', 'Sunset Orange', 'Royal Purple'];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className={`w-80 h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Learn Karo</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Student Portal</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation Menu */}
        <div className="p-4">
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-300'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.active && <div className="ml-auto w-2 h-2 bg-teal-500 rounded-full"></div>}
              </a>
            ))}
          </nav>
        </div>

        {/* Quick Stats */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
            Study Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {studyStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</span>
                </div>
                <p className="text-lg font-bold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Settings Sections */}
        <div className="p-4 space-y-1">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
            Preferences
          </h3>

          {/* Display Settings */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <button
              onClick={() => toggleSection('display')}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5" />
                <span className="font-medium">Display</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === 'display' ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSection === 'display' && (
              <div className="ml-8 space-y-3 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-teal-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'} flex items-center justify-center`}>
                      {darkMode ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                    </div>
                  </button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Theme</label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  >
                    {themes.map((theme) => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <button
              onClick={() => toggleSection('notifications')}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notifications</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === 'notifications' ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSection === 'notifications' && (
              <div className="ml-8 space-y-3 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-teal-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sound Effects</span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${soundEnabled ? 'bg-teal-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'} flex items-center justify-center`}>
                      {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <button
              onClick={() => toggleSection('language')}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Language</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === 'language' ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSection === 'language' && (
              <div className="ml-8 mt-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Privacy & Security */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <button
              onClick={() => toggleSection('privacy')}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Privacy & Security</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === 'privacy' ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSection === 'privacy' && (
              <div className="ml-8 space-y-2 mt-2">
                <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  <Eye className="w-4 h-4" />
                  <span>Privacy Settings</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  <Download className="w-4 h-4" />
                  <span>Download Data</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Support Section */}
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
            Support
          </h3>
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Help Center</span>
            <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
          </button>
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-medium">Send Feedback</span>
            <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div>
            <p className="font-medium">Alex Johnson</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Premium Student</p>
          </div>
        </div>
        <button className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;