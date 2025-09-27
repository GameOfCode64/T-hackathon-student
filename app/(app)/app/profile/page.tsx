'use client'
import React, { useState } from 'react';
import { User, Edit3, Save, X, Eye, Brain, Volume2, Palette, Clock, Bell, Shield } from 'lucide-react';

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Bhavishya',
    lastName: 'Robot',
    age: 16,
    phone: '+91 98765 43210',
    address: '123 Learning Street, Education City, Delhi 110001',
    isDyslexic: false,
    hasADHD: false,
    visualMode: false,
    fontSize: 'medium',
    colorTheme: 'default',
    audioAssist: false,
    breakReminders: false,
    focusMode: false
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleAccessibilityChange = (field, value) => {
    const updatedProfile = { ...tempProfile, [field]: value };
    
    // Auto-enable visual mode if dyslexic or ADHD is selected
    if ((field === 'isDyslexic' || field === 'hasADHD') && value) {
      updatedProfile.visualMode = true;
    }
    
    setTempProfile(updatedProfile);
  };

  const AccessibilityFeature = ({ icon: Icon, title, description, field, enabled }) => (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className={`p-2 rounded-lg ${enabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <button
        onClick={() => handleAccessibilityChange(field, !tempProfile[field])}
        disabled={!isEditing}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          tempProfile[field] 
            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {tempProfile[field] ? 'Enabled' : 'Enable'}
      </button>
    </div>
  );

  return (
    <div className="w-full h-screen p-6 bg-white">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User size={32} className="" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-emerald-100">Student Profile</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-white bg-opacity-20  px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2"
                >
                  <Edit3 size={18} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfile.firstName}
                        onChange={(e) => setTempProfile({ ...tempProfile, firstName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="py-2 text-gray-900">{profile.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfile.lastName}
                        onChange={(e) => setTempProfile({ ...tempProfile, lastName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="py-2 text-gray-900">{profile.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <p className="py-2 text-gray-600 bg-gray-50 px-3 rounded-lg">{profile.age} years old</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempProfile.phone}
                      onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="py-2 text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={tempProfile.address}
                      onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ) : (
                    <p className="py-2 text-gray-900">{profile.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Learning Conditions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Support</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Do you have any learning conditions?</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempProfile.isDyslexic}
                        onChange={(e) => handleAccessibilityChange('isDyslexic', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded disabled:opacity-50"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">Dyslexia</span>
                        <p className="text-xs text-gray-600">Reading and language processing difficulties</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempProfile.hasADHD}
                        onChange={(e) => handleAccessibilityChange('hasADHD', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded disabled:opacity-50"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">ADHD</span>
                        <p className="text-xs text-gray-600">Attention and hyperactivity challenges</p>
                      </div>
                    </label>
                  </div>
                </div>

                {(tempProfile.isDyslexic || tempProfile.hasADHD) && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="text-green-600" size={16} />
                      <h4 className="font-medium text-green-900">Accessibility Features Enabled</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      The platform will automatically provide visual learning aids, shorter text segments, 
                      and interactive content to support your learning style.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Accessibility Features */}
          {(tempProfile.isDyslexic || tempProfile.hasADHD) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Learning Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <AccessibilityFeature
                  icon={Eye}
                  title="Visual Learning Mode"
                  description="Replace long texts with diagrams, infographics, and visual aids"
                  field="visualMode"
                  enabled={tempProfile.visualMode}
                />
                
                <AccessibilityFeature
                  icon={Volume2}
                  title="Audio Assistance"
                  description="Text-to-speech for reading support"
                  field="audioAssist"
                  enabled={tempProfile.audioAssist}
                />
                
                <AccessibilityFeature
                  icon={Clock}
                  title="Break Reminders"
                  description="Regular break notifications to maintain focus"
                  field="breakReminders"
                  enabled={tempProfile.breakReminders}
                />
                
                <AccessibilityFeature
                  icon={Brain}
                  title="Focus Mode"
                  description="Minimize distractions with simplified interface"
                  field="focusMode"
                  enabled={tempProfile.focusMode}
                />
              </div>

              {/* Additional Settings */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Display Preferences</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Size
                    </label>
                    <select
                      value={tempProfile.fontSize}
                      onChange={(e) => setTempProfile({ ...tempProfile, fontSize: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Theme
                    </label>
                    <select
                      value={tempProfile.colorTheme}
                      onChange={(e) => setTempProfile({ ...tempProfile, colorTheme: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
                    >
                      <option value="default">Default</option>
                      <option value="high-contrast">High Contrast</option>
                      <option value="dark-mode">Dark Mode</option>
                      <option value="dyslexia-friendly">Dyslexia Friendly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Learning Stats */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">90%</div>
                <div className="text-sm text-gray-600">Mathematics</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">30%</div>
                <div className="text-sm text-gray-600">Science</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-600">10%</div>
                <div className="text-sm text-gray-600">History</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">0%</div>
                <div className="text-sm text-gray-600">Computer Science</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}