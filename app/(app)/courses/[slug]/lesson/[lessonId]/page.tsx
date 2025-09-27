'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Star, BarChart3, Zap, BookOpen, Volume2, X, Eye, Expand, Shrink, TestTube2, RotateCcw, RotateCw } from 'lucide-react';

// --- MOCK DATA ---
const demoData = {
  levels: [
    {
      id: 1,
      name: 'Level 1',
      lessons: [
        {
          id: 1,
          title: 'Lesson 1: Introduction to Triangles',
          content: "A triangle is a polygon with three edges and three vertices. It is one of the basic shapes in geometry. A triangle with vertices A, B, and C is denoted as ΔABC. The sum of the angles in any triangle is always 180 degrees.",
          questions: [
            {
              id: 'q1',
              question: "What is the fundamental property of the angles in a triangle?",
              explanation: "The sum of the three interior angles of any triangle always equals 180 degrees. This is a core theorem in Euclidean geometry. For example, if two angles are 60 and 80 degrees, the third must be 180 - (60 + 80) = 40 degrees."
            },
            {
              id: 'q2',
              question: "How are triangles classified by their sides?",
              explanation: "Triangles can be classified into three types based on the length of their sides: Equilateral (all three sides are equal), Isosceles (two sides are equal), and Scalene (no sides are equal)."
            }
          ],
          visuals: [
            { id: 'v1', type: 'TriangleDiagram', data: { a: 60, b: 70, c: 50 } },
            { id: 'v2', type: 'TriangleTypes', data: {} }
          ]
        },
        {
          id: 2,
          title: 'Lesson 2: Circles (Locked)',
          content: "This content is locked.",
          questions: [],
          visuals: []
        }
      ]
    },
    {
      id: 2,
      name: 'Level 2',
      lessons: []
    }
  ]
};

// --- VISUAL COMPONENTS (DUMMY) ---
const TriangleDiagram = ({ data }) => (
  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center">
    <h3 className="text-lg font-semibold text-cyan-300 mb-4">Angle Sum Property</h3>
    <svg viewBox="0 0 200 170" className="w-48 h-48">
      <polygon points="100,10 10,160 190,160" className="fill-transparent stroke-white stroke-2" />
      <text x="100" y="35" textAnchor="middle" fill="white" fontSize="14">{data.a}°</text>
      <text x="30" y="155" textAnchor="middle" fill="white" fontSize="14">{data.b}°</text>
      <text x="170" y="155" textAnchor="middle" fill="white" fontSize="14">{data.c}°</text>
    </svg>
    <p className="mt-4 text-center text-gray-300">The sum of angles A, B, and C is always 180°.</p>
  </div>
);

const TriangleTypes = () => (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center">
        <h3 className="text-lg font-semibold text-cyan-300 mb-4">Classification by Sides</h3>
        <div className="flex space-x-4 text-center">
            <div>
                <svg viewBox="0 0 100 100" className="w-24 h-24"><polygon points="50,10 10,90 90,90" className="fill-transparent stroke-white stroke-1" /></svg>
                <p className="text-sm mt-2">Scalene</p>
            </div>
            <div>
                <svg viewBox="0 0 100 100" className="w-24 h-24"><polygon points="50,10 15,90 85,90" className="fill-transparent stroke-white stroke-1" /></svg>
                <p className="text-sm mt-2">Isosceles</p>
            </div>
            <div>
                <svg viewBox="0 0 100 100" className="w-24 h-24"><polygon points="50,15 10,85 90,85" className="fill-transparent stroke-white stroke-1" /></svg>
                <p className="text-sm mt-2">Equilateral</p>
            </div>
        </div>
    </div>
);

const visualMapping = {
  TriangleDiagram,
  TriangleTypes
};


// --- EMOTION DETECTION COMPONENT ---
const EmotionDetector = () => {
  const [emotion, setEmotion] = useState("Initializing...");
  const [videoReady, setVideoReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const detectEmotion = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const step = 8;
    let totalBrightness = 0, totalRed = 0, totalGreen = 0, totalBlue = 0, pixelCount = 0;

    for (let i = 0; i < data.length; i += step * 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      totalBrightness += (r + g + b) / 3;
      totalRed += r; totalGreen += g; totalBlue += b;
      pixelCount++;
    }

    const avgBrightness = totalBrightness / pixelCount;
    const avgRed = totalRed / pixelCount;
    const avgGreen = totalGreen / pixelCount;
    const avgBlue = totalBlue / pixelCount;
    
    let currentEmotion = "Neutral", confidence = 50, dbg = "";
    const maxColor = Math.max(avgRed, avgGreen, avgBlue);
    const colorDominance = maxColor / (avgRed + avgGreen + avgBlue);

    if (avgBrightness > 160) { currentEmotion = "Happy"; confidence = Math.min(90, 60 + (avgBrightness - 160) / 2); dbg = `Very bright: ${avgBrightness.toFixed(0)}`; }
    else if (avgBrightness < 70) { currentEmotion = "Sad"; confidence = Math.min(85, 50 + (70 - avgBrightness) / 2); dbg = `Very dark: ${avgBrightness.toFixed(0)}`; }
    else if (avgRed > avgGreen && avgRed > avgBlue && colorDominance > 0.4) { currentEmotion = "Excited"; confidence = Math.min(80, 40 + (avgRed - Math.max(avgGreen, avgBlue)) / 2); dbg = `Red dominant: ${avgRed.toFixed(0)}`; }
    else if (avgBlue > avgGreen && avgBlue > avgRed && colorDominance > 0.4) { currentEmotion = "Calm"; confidence = Math.min(75, 35 + (avgBlue - Math.max(avgGreen, avgRed)) / 2); dbg = `Blue dominant: ${avgBlue.toFixed(0)}`; }
    else if (avgGreen > avgRed && avgGreen > avgBlue && colorDominance > 0.4) { currentEmotion = "Focused"; confidence = Math.min(70, 30 + (avgGreen - Math.max(avgRed, avgBlue)) / 2); dbg = `Green dominant: ${avgGreen.toFixed(0)}`; }
    else if (avgBrightness > 130) { currentEmotion = "Cheerful"; confidence = Math.min(65, 25 + (avgBrightness - 130) / 3); dbg = `Bright: ${avgBrightness.toFixed(0)}`; }
    else if (avgBrightness < 100) { currentEmotion = "Tired"; confidence = Math.min(60, 20 + (100 - avgBrightness) / 3); dbg = `Dark: ${avgBrightness.toFixed(0)}`; }
    else { currentEmotion = "Neutral"; confidence = 50; dbg = `Balanced: ${avgBrightness.toFixed(0)}`; }

    setEmotion(`${currentEmotion} (${confidence.toFixed(0)}%)`);
    setDebugInfo(dbg);

    ctx.strokeStyle = "#00ff00"; ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.fillStyle = "#00ff00"; ctx.font = "bold 18px Arial";
    ctx.fillText(currentEmotion, 10, 30);
  };

  useEffect(() => {
    const startVideo = async () => {
      try {
        setDebugInfo("Starting camera...");
        if (videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } });
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => setTimeout(() => {
              if (videoRef.current && videoRef.current.videoWidth > 0) {
                setVideoReady(true);
                setDebugInfo(`Video ready: ${videoRef.current.videoWidth}x${videoRef.current.videoHeight}`);
              } else { setDebugInfo("Video dimensions not ready yet"); }
            }, 500)).catch(err => { setDebugInfo(`Video play error: ${err}`); });
          };
        }
      } catch (err) { setEmotion("Camera access denied"); setDebugInfo(`Camera error: ${err}`); }
    };
    startVideo();
    return () => {
      if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!videoReady || !videoRef.current || !canvasRef.current) return;
    const video = videoRef.current; const canvas = canvasRef.current;
    if (video.videoWidth === 0) { setDebugInfo("Waiting for video dimensions..."); return; }
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    detectionIntervalRef.current = setInterval(() => {
      if (!video || video.paused || video.ended || video.readyState !== 4) return;
      try { detectEmotion(video, canvas); }
      catch (err) { setEmotion("Detection error"); setDebugInfo(`Detection error: ${err}`); }
    }, 1000);
    return () => { if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current); };
  }, [videoReady]);

  return (
    <div className="mt-8 flex flex-col items-center gap-4 p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold">Live Emotion Detection</h2>
      <div className="flex gap-4 text-sm">
        <span className={videoReady ? "text-green-400" : "text-yellow-400"}>
          Camera: {videoReady ? "Ready" : "Initializing..."}
        </span>
      </div>
      {debugInfo && <div className="text-xs text-gray-400 bg-gray-800 p-2 rounded max-w-md text-center">Debug: {debugInfo}</div>}
      <div className="relative w-full max-w-2xl h-72 bg-gray-800 rounded-xl overflow-hidden">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }}/>
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ transform: "scaleX(-1)" }}/>
      </div>
      <p className="text-white text-xl">Current Emotion: {emotion}</p>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function MathematicsPage() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechStateRef = useRef({
    fullText: '',
    words: [],
    currentCharIndex: 0,
  });

  useEffect(() => {
    // Cleanup speech synthesis on component unmount
    const cleanup = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  const handleSelectLesson = (lesson) => {
    if (lesson.title.includes('Locked')) return;
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    setSelectedLesson(lesson);
    setIsVisualizing(false);
    setIsFullScreen(false);
    setIsReading(false);
  };
  
  const handleGoBack = () => {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    setSelectedLesson(null);
    setIsVisualizing(false);
    setIsFullScreen(false);
    setIsReading(false);
  };

  const handleToggleVisualize = () => {
    setIsVisualizing(!isVisualizing);
    setIsFullScreen(false);
  };
  
  const handleSeekSpeech = (seconds) => {
    if (!isReading || !utteranceRef.current) return;

    const wordsPerSecond = 2.5; // Average estimate
    const wordJump = Math.round(seconds * wordsPerSecond);

    let currentWordIndex = -1;
    let charCount = 0;
    for (let i = 0; i < speechStateRef.current.words.length; i++) {
        charCount += speechStateRef.current.words[i].length + 1;
        if (charCount > speechStateRef.current.currentCharIndex) {
            currentWordIndex = i;
            break;
        }
    }
    if (currentWordIndex === -1) currentWordIndex = 0;

    const newWordIndex = Math.max(0, Math.min(speechStateRef.current.words.length - 1, currentWordIndex + wordJump));

    let newCharIndex = 0;
    for (let i = 0; i < newWordIndex; i++) {
        newCharIndex += speechStateRef.current.words[i].length + 1;
    }

    speechSynthesis.cancel();
    setTimeout(() => {
        const textToSpeakFrom = speechStateRef.current.fullText.substring(newCharIndex);
        const newUtterance = new SpeechSynthesisUtterance(textToSpeakFrom);
        
        newUtterance.onstart = () => setIsReading(true);
        newUtterance.onend = () => setIsReading(false);
        newUtterance.onerror = () => setIsReading(false);
        newUtterance.onboundary = (event) => {
            speechStateRef.current.currentCharIndex = newCharIndex + event.charIndex;
        };

        utteranceRef.current = newUtterance;
        speechSynthesis.speak(newUtterance);
    }, 100);
  };

  const handleToggleRead = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    if (!selectedLesson) return;

    const textToRead = `Lesson: ${selectedLesson.title}. ${selectedLesson.content}. Question 1: ${selectedLesson.questions[0].question}. Explanation: ${selectedLesson.questions[0].explanation}. Question 2: ${selectedLesson.questions[1].question}. Explanation: ${selectedLesson.questions[1].explanation}.`;
    
    speechStateRef.current.fullText = textToRead;
    speechStateRef.current.words = textToRead.split(/\s+/);
    speechStateRef.current.currentCharIndex = 0;

    const newUtterance = new SpeechSynthesisUtterance(textToRead);
    
    newUtterance.onstart = () => setIsReading(true);
    newUtterance.onend = () => setIsReading(false);
    newUtterance.onerror = (e) => setIsReading(false);
    newUtterance.onboundary = (event) => {
        speechStateRef.current.currentCharIndex = event.charIndex;
    };

    utteranceRef.current = newUtterance;
    speechSynthesis.speak(newUtterance);
  };

  const handleGoToQuiz = () => {
      // In a real app, this would use Next.js Router to navigate.
      console.log("Navigating to quiz for lesson:", selectedLesson?.id);
      alert("Quiz feature is not implemented in this demo.");
  };

  const Header = () => (
    <div className="flex justify-between items-center w-full p-4 bg-gray-800 rounded-lg shadow-lg">
       <button onClick={handleGoBack} className="flex items-center gap-2 text-lg font-bold text-white hover:text-cyan-300 transition-colors">
          <ChevronLeft size={24} />
          MATHEMATICS
      </button>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-md text-yellow-400">
          <Star size={20} />
          <span className="font-semibold">10</span>
          <span className="text-gray-400 text-sm">Player Level</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-md text-yellow-400">
           <Star size={20} className="fill-yellow-400"/>
          <span className="font-semibold">12</span>
          <span className="text-gray-400 text-sm">Total Stars</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-md text-orange-400">
          <Zap size={20} />
          <span className="font-semibold">3</span>
          <span className="text-gray-400 text-sm">Day Streak</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-md text-purple-400">
          <BarChart3 size={20} />
          <span className="font-semibold">25000</span>
           <span className="text-gray-400 text-sm">Experience</span>
        </div>
      </div>
    </div>
  );

  const LessonSelector = () => {
    const level = demoData.levels.find(l => l.id === selectedLevel);
    return (
      <div className="w-full mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Your Levels</h2>
        <div className="flex gap-4 mb-8">
            <button 
                onClick={() => setSelectedLevel(1)}
                className={`px-8 py-4 rounded-lg font-bold transition-all ${selectedLevel === 1 ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                Level 1 {selectedLevel === 1 && '✓'}
            </button>
            <button 
                className="px-8 py-4 rounded-lg font-bold bg-gray-700 text-gray-400 cursor-not-allowed flex items-center gap-2">
                Level 2 🔒
            </button>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-4">Lessons in Level {selectedLevel}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {level.lessons.map(lesson => {
            const isLocked = lesson.title.includes('Locked');
            return (
              <button 
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson)}
                disabled={isLocked}
                className={`p-6 rounded-lg text-left transition-all ${isLocked ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 hover:ring-2 ring-cyan-400'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-white">{lesson.title}</span>
                  {isLocked ? <span className="text-gray-500">🔒</span> : <BookOpen className="text-gray-400" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    );
  };
  
  const LessonContent = ({ lesson }) => (
    <div className="p-8 bg-gray-800/80 rounded-lg backdrop-blur-sm h-full overflow-y-auto">
        <h2 className="text-3xl font-bold text-cyan-300 mb-4">{lesson.title}</h2>
        <p className="text-gray-300 leading-relaxed mb-6">{lesson.content}</p>
        <div className="space-y-6">
          {lesson.questions.map(q => (
            <div key={q.id} className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-white mb-2">{q.question}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
  );

  const VisualizationPanel = ({ lesson }) => (
    <div className={`p-4 bg-gray-900 rounded-lg h-full flex flex-col gap-4 overflow-y-auto transition-all duration-300
        ${isFullScreen ? 'fixed inset-0 z-50 p-8' : 'relative'}`}
    >
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-white">Visualizations</h3>
             <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 rounded-md bg-gray-700 hover:bg-cyan-500 text-white transition-colors"
             >
                {isFullScreen ? <Shrink size={20} /> : <Expand size={20} />}
             </button>
        </div>
       <div className="flex-grow space-y-4">
        {lesson.visuals.map(vis => {
            const VisualComponent = visualMapping[vis.type];
            return VisualComponent ? <VisualComponent key={vis.id} data={vis.data} /> : null;
        })}
       </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white font-sans from-gray-900 to-black bg-gradient-to-br">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        
        {!selectedLesson ? (
          <LessonSelector />
        ) : (
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center p-1 bg-gray-800 rounded-lg shadow-md">
                    <button 
                      onClick={handleToggleRead}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all text-white ${isReading ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      <Volume2 size={20} />
                      {isReading ? 'Stop' : 'Read'}
                    </button>
                    <button
                        onClick={() => handleSeekSpeech(-5)}
                        disabled={!isReading}
                        className="px-3 py-2 text-white rounded-md disabled:text-gray-500 disabled:bg-transparent disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                        title="Seek backward 5 seconds"
                    >
                        <RotateCcw size={18} />
                    </button>
                    <button
                        onClick={() => handleSeekSpeech(5)}
                        disabled={!isReading}
                        className="px-3 py-2 text-white rounded-md disabled:text-gray-500 disabled:bg-transparent disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                        title="Seek forward 5 seconds"
                    >
                        <RotateCw size={18} />
                    </button>
                </div>
                <button 
                  onClick={handleToggleVisualize}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all text-white ${isVisualizing ? 'bg-purple-600' : 'bg-gray-700'} hover:bg-purple-700`}
                >
                  <Eye size={20} />
                  {isVisualizing ? 'Hide Visuals' : 'Visualize Content'}
                </button>
                 <button
                  onClick={handleGoToQuiz}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all text-white bg-green-600 hover:bg-green-700"
                >
                  <TestTube2 size={20} />
                  Go to Quiz
                </button>
            </div>

            <div className={`transition-all duration-500 ease-in-out grid gap-6 ${isVisualizing ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                <div className="col-span-1">
                    <LessonContent lesson={selectedLesson} />
                </div>
                {isVisualizing && (
                    <div className="col-span-1 min-h-[400px] md:min-h-0">
                         <VisualizationPanel lesson={selectedLesson} />
                    </div>
                )}
            </div>
            
            {/* --- INTEGRATED EMOTION DETECTOR --- */}
            <EmotionDetector />

          </div>
        )}
      </div>
    </main>
  );
}

