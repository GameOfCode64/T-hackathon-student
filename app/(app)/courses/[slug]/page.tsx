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
          content: "A triangle is a fundamental polygon in geometry, defined by three edges and three vertices. The points where the edges meet are called vertices. Triangles are classified based on their sides (equilateral, isosceles, scalene) and their angles (acute, obtuse, right). A key property is that the sum of the interior angles of any triangle always equals 180 degrees, a cornerstone of Euclidean geometry.",
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
            },
            {
              id: 'q3',
              question: "What is a right-angled triangle?",
              explanation: "A right-angled (or right) triangle is one in which one of the interior angles is exactly 90 degrees. The side opposite the right angle is called the hypotenuse and is always the longest side."
            }
          ],
          visuals: [
            { id: 'v1', type: 'TriangleDiagram', data: { a: 60, b: 70, c: 50 } },
            { id: 'v2', type: 'TriangleTypes', data: {} }
          ]
        },
        {
          id: 2,
          title: 'Lesson 2: The Pythagorean Theorem',
          content: "The Pythagorean theorem is a crucial principle for right-angled triangles. It establishes a relationship between the lengths of the three sides, stating that the area of the square on the hypotenuse is equal to the sum of the areas of the squares on the other two sides (legs). This theorem is foundational to trigonometry and distance calculations in coordinate geometry.",
          questions: [
            {
              id: 'q1',
              question: "What is the formula for the Pythagorean theorem?",
              explanation: "The formula is a² + b² = c², where 'a' and 'b' are the lengths of the two legs of a right triangle, and 'c' is the length of the hypotenuse."
            },
            {
              id: 'q2',
              question: "Can the theorem be applied to any triangle?",
              explanation: "No, the Pythagorean theorem applies exclusively to right-angled triangles. It cannot be used to find side lengths in acute or obtuse triangles directly."
            },
            {
              id: 'q3',
              question: "What is a Pythagorean triple?",
              explanation: "A Pythagorean triple consists of three positive integers a, b, and c, such that a² + b² = c². A well-known example is (3, 4, 5), because 3² + 4² = 9 + 16 = 25, which is 5². Other examples include (5, 12, 13) and (8, 15, 17)."
            }
          ],
          visuals: [
            { id: 'v1', type: 'PythagoreanDiagram', data: { a: 3, b: 4 } },
          ]
        },
        {
          id: 3,
          title: 'Lesson 3: Area of a Circle',
          content: "The area of a circle is the total two-dimensional space it occupies. It is determined by its radius, which is the distance from the center to any point on the circumference. The formula involves the irrational number Pi (π), an essential constant in mathematics representing the ratio of a circle's circumference to its diameter.",
          questions: [
            {
              id: 'q1',
              question: "What is the formula for the area of a circle?",
              explanation: "The formula is A = πr², where 'A' is the area and 'r' is the radius of the circle. The radius is the distance from the center of the circle to any point on its edge."
            },
            {
                id: 'q2',
                question: "What is the difference between radius and diameter?",
                explanation: "The diameter is the distance across the circle passing through the center, while the radius is the distance from the center to the edge. The diameter is always twice the length of the radius (d = 2r)."
            },
            {
                id: 'q3',
                question: "How does doubling the radius affect the area?",
                explanation: "Since the area formula is A = πr², the radius is squared. Therefore, doubling the radius will quadruple the area. For instance, a circle with radius 2 has an area of 4π, while a circle with radius 4 has an area of 16π."
            }
          ],
          visuals: [
            { id: 'v1', type: 'CircleAreaDiagram', data: { radius: 5 } },
          ]
        },
        {
            id: 4,
            title: 'Lesson 4: Basic Probability',
            content: "Probability measures the likelihood of an event occurring, expressed as a number between 0 (impossibility) and 1 (certainty). It's a fundamental concept in statistics, finance, and science for quantifying uncertainty. The calculation involves comparing favorable outcomes to the total number of possible outcomes in a given scenario.",
            questions: [
              {
                id: 'q1',
                question: "How do you calculate the probability of a single event?",
                explanation: "The probability of an event is calculated by dividing the number of favorable outcomes by the total number of possible outcomes. For example, the probability of rolling a 4 on a six-sided die is 1/6."
              },
              {
                  id: 'q2',
                  question: "What is a sample space?",
                  explanation: "A sample space is the set of all possible outcomes of a random experiment. For a coin flip, the sample space is {Heads, Tails}. For rolling a standard die, it's {1, 2, 3, 4, 5, 6}."
              },
              {
                  id: 'q3',
                  question: "What is the probability of an event that is certain to happen?",
                  explanation: "An event that is certain to happen has a probability of 1. For example, the probability of picking a red ball from a bag containing only red balls is 1. Conversely, an impossible event has a probability of 0."
              }
            ],
            visuals: [
              { id: 'v1', type: 'ProbabilityDiagram', data: { favorable: 2, total: 10, favorableColor: 'red', otherColor: 'blue' } },
            ]
        },
        {
            id: 5,
            title: 'Lesson 5: Understanding Slope',
            content: "In mathematics, the slope or gradient of a line is a number that describes both the direction and the steepness of the line. It's often defined as 'rise over run'—the change in the vertical direction (rise) for a given change in the horizontal direction (run). A positive slope means the line goes uphill from left to right, while a negative slope means it goes downhill.",
            questions: [
                {
                    id: 'q1',
                    question: "How is the slope of a line calculated?",
                    explanation: "The slope (m) is calculated using the formula m = (y₂ - y₁) / (x₂ - x₁), where (x₁, y₁) and (x₂, y₂) are two distinct points on the line. It represents the rate of change in y for a unit change in x."
                },
                {
                    id: 'q2',
                    question: "What do horizontal and vertical lines' slopes represent?",
                    explanation: "A horizontal line has a slope of 0 because there is no vertical change (rise = 0). A vertical line has an undefined slope because there is no horizontal change (run = 0), which would lead to division by zero in the formula."
                },
                {
                    id: 'q3',
                    question: "What are parallel and perpendicular slopes?",
                    explanation: "Parallel lines have the same slope. Perpendicular lines have slopes that are negative reciprocals of each other. For example, if a line has a slope of 2, a line perpendicular to it will have a slope of -1/2."
                }
            ],
            visuals: [
                { id: 'v1', type: 'SlopeDiagram', data: { x1: -2, y1: -1, x2: 2, y2: 1 } },
            ]
        },
        {
            id: 6,
            title: 'Lesson 6: Introduction to Algebra',
            content: "Algebra is a branch of mathematics that uses symbols and letters to represent numbers and quantities in formulas and equations. It provides a systematic way to solve for unknown variables. A basic algebraic equation involves finding the value of a variable, like 'x', that makes the equation true. For example, in 'x + 5 = 8', 'x' represents an unknown value.",
            questions: [
                {
                    id: 'q1',
                    question: "What is the goal of solving a basic algebraic equation?",
                    explanation: "The goal is to isolate the variable (like 'x') on one side of the equation to find its value. This is done by performing the same operation on both sides of the equation to maintain balance. For 'x + 5 = 8', you would subtract 5 from both sides to get x = 3."
                },
                {
                    id: 'q2',
                    question: "What is a variable?",
                    explanation: "A variable is a symbol (usually a letter) that represents an unknown number or a quantity that can change. In algebra, variables are used to generalize relationships and solve a wide range of problems where values are not immediately known."
                },
                {
                    id: 'q3',
                    question: "What does 'balancing the equation' mean?",
                    explanation: "An equation is like a balanced scale. To keep it balanced, any operation (addition, subtraction, multiplication, division) you perform on one side must also be performed on the other side. This principle is fundamental to solving for the unknown variable."
                }
            ],
            visuals: [
                { id: 'v1', type: 'AlgebraDiagram', data: { expression: "x + 5 = 8" } },
            ]
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

// --- VISUAL COMPONENTS ---
const TriangleDiagram = ({ data }) => {
    return (
        <div key={Math.random()} className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center overflow-hidden">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Angle Sum Property</h3>
            <style>{`
                .triangle-path { stroke-dasharray: 600; stroke-dashoffset: 600; animation: draw 2s ease-out forwards; }
                .arc { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw 1s ease-out 1s forwards; }
                .label { opacity: 0; animation: fade-in 1s ease-out 2s forwards; }
                @keyframes draw { to { stroke-dashoffset: 0; } }
                @keyframes fade-in { to { opacity: 1; } }
            `}</style>
            <svg viewBox="0 0 200 170" className="w-48 h-48">
              <polygon points="100,10 10,160 190,160" className="fill-cyan-500/10 stroke-white stroke-2 triangle-path" />
              <path d="M 90 40 A 30 30 0 0 1 125 25" fill="none" stroke="yellow" strokeWidth="1.5" className="arc" />
              <text x="100" y="35" textAnchor="middle" fill="white" fontSize="14" className="font-bold label">{data.a}°</text>
              <path d="M 30 160 A 20 20 0 0 1 40 142" fill="none" stroke="yellow" strokeWidth="1.5" className="arc" />
              <text x="30" y="155" textAnchor="middle" fill="white" fontSize="14" className="font-bold label">{data.b}°</text>
               <path d="M 170 160 A 20 20 0 0 0 160 142" fill="none" stroke="yellow" strokeWidth="1.5" className="arc" />
              <text x="170" y="155" textAnchor="middle" fill="white" fontSize="14" className="font-bold label">{data.c}°</text>
            </svg>
            <p className="mt-4 text-center text-gray-300 font-mono text-lg label">{data.a}° + {data.b}° + {data.c}° = 180°</p>
        </div>
    );
};

const TriangleTypes = () => (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center">
        <h3 className="text-lg font-semibold text-cyan-300 mb-4">Classification by Sides</h3>
        <style>{`
            .triangle-group:hover .triangle-shape { stroke: #22D3EE; transform: scale(1.05); }
            .triangle-group .tick { opacity: 0; transition: opacity 0.3s ease-in-out; }
            .triangle-group:hover .tick { opacity: 1; }
        `}</style>
        <div className="flex justify-around w-full text-center">
            <div className="triangle-group cursor-pointer">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                    <polygon points="50,10 10,90 90,90" className="fill-transparent stroke-white stroke-1 transition-all duration-300 triangle-shape" />
                </svg>
                <p className="text-sm mt-2 font-semibold">Scalene<br/><span className="font-normal text-gray-400">(No equal sides)</span></p>
            </div>
            <div className="triangle-group cursor-pointer">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                    <g className="transition-all duration-300 triangle-shape">
                        <polygon points="50,10 15,90 85,90" className="fill-transparent stroke-white stroke-1" />
                        <line x1="30" y1="50" x2="45" y2="50" stroke="yellow" strokeWidth="2" className="tick" />
                        <line x1="55" y1="50" x2="70" y2="50" stroke="yellow" strokeWidth="2" className="tick" />
                    </g>
                </svg>
                <p className="text-sm mt-2 font-semibold">Isosceles<br/><span className="font-normal text-gray-400">(Two equal sides)</span></p>
            </div>
            <div className="triangle-group cursor-pointer">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                    <g className="transition-all duration-300 triangle-shape">
                        <polygon points="50,15 10,85 90,85" className="fill-transparent stroke-white stroke-1" />
                        <line x1="28" y1="50" x2="43" y2="50" stroke="yellow" strokeWidth="2" className="tick" />
                        <line x1="57" y1="50" x2="72" y2="50" stroke="yellow" strokeWidth="2" className="tick" />
                        <line x1="45" y1="85" x2="60" y2="85" stroke="yellow" strokeWidth="2" className="tick" />
                    </g>
                </svg>
                <p className="text-sm mt-2 font-semibold">Equilateral<br/><span className="font-normal text-gray-400">(All equal sides)</span></p>
            </div>
        </div>
    </div>
);

const PythagoreanDiagram = ({ data }) => {
    const [a, setA] = useState(data.a);
    const [b, setB] = useState(data.b);
    const c = Math.sqrt(a * a + b * b);

    const scale = 20;
    const padding = 10;
    const svgWidth = 300;
    const svgHeight = 200;

    const trianglePoints = `${padding},${svgHeight - padding - b * scale} ${padding},${svgHeight - padding} ${padding + a * scale},${svgHeight - padding}`;

    return (
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">Interactive Proof</h3>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full">
                {/* Visual Equation */}
                <g>
                    <rect x="10" y="10" width={a * scale} height={a * scale} className="fill-blue-500/30 transition-all duration-300" />
                    <text x={10 + a * scale / 2} y={15 + a * scale / 2} textAnchor="middle" alignmentBaseline="middle" fill="white" fontSize="10" className="font-mono">a²</text>
                    
                    <text x={15 + a * scale} y={15 + Math.max(a, b) * scale / 2} fill="white" fontSize="14">+</text>
                    
                    <rect x={20 + a * scale} y="10" width={b * scale} height={b * scale} className="fill-red-500/30 transition-all duration-300" />
                    <text x={20 + a * scale + b * scale / 2} y={15 + b * scale / 2} textAnchor="middle" alignmentBaseline="middle" fill="white" fontSize="10" className="font-mono">b²</text>
                    
                    <text x={25 + a * scale + b * scale} y={15 + Math.max(a,b,c) * scale / 2} fill="white" fontSize="14">=</text>
                    
                    <rect x={30 + a * scale + b * scale} y="10" width={c * scale} height={c * scale} className="fill-green-500/30 transition-all duration-300" />
                    <text x={30 + a * scale + b * scale + c * scale / 2} y={15 + c * scale / 2} textAnchor="middle" alignmentBaseline="middle" fill="white" fontSize="10" className="font-mono">c²</text>
                </g>

                {/* The Triangle */}
                <polygon points={trianglePoints} className="fill-gray-700 stroke-white stroke-2 transition-all duration-300" />
                <text x={padding + a * scale / 2} y={svgHeight - padding + 10} textAnchor="middle" fill="white" fontSize="8" className="font-mono">a = {a.toFixed(1)}</text>
                <text x={padding - 5} y={svgHeight - padding - b * scale / 2} textAnchor="end" alignmentBaseline="middle" fill="white" fontSize="8" className="font-mono">b = {b.toFixed(1)}</text>
            </svg>
            <div className="w-full max-w-xs mt-2 space-y-2">
                <div className="flex items-center gap-2">
                    <label htmlFor="a" className="font-mono text-blue-400">a:</label>
                    <input type="range" id="a" min="1" max="5" step="0.1" value={a} onChange={e => setA(parseFloat(e.target.value))} className="w-full" />
                    <span className="font-mono text-sm w-10 text-right">{a.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="b" className="font-mono text-red-400">b:</label>
                    <input type="range" id="b" min="1" max="5" step="0.1" value={b} onChange={e => setB(parseFloat(e.target.value))} className="w-full" />
                    <span className="font-mono text-sm w-10 text-right">{b.toFixed(1)}</span>
                </div>
            </div>
            <p className="mt-2 text-center text-gray-300 font-mono text-sm">
                <span className="text-blue-400">{ (a*a).toFixed(1)}</span> + <span className="text-red-400">{ (b*b).toFixed(1)}</span> = <span className="text-green-400">{ (c*c).toFixed(1)}</span>
            </p>
        </div>
    );
};


const CircleAreaDiagram = ({ data }) => {
    const [radius, setRadius] = useState(data.radius);
    const area = Math.PI * radius * radius;
    const scale = 8;

    return (
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">Interactive Circle Area</h3>
            <svg viewBox="0 0 200 200" className="w-48 h-48">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 180, 180, 0.3)" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#grid)" />
                <circle cx="100" cy="100" r={radius * scale} className="fill-cyan-500/30 stroke-white stroke-2 transition-all duration-300" />
                <line x1="100" y1="100" x2={100 + radius * scale} y2="100" className="stroke-yellow-300 stroke-2 transition-all duration-300" />
                <circle cx="100" cy="100" r="3" className="fill-yellow-300" />
                <text x={100 + radius*scale/2} y="95" fill="white" fontSize="12" className="font-bold transition-all duration-300">r={radius.toFixed(1)}</text>
            </svg>
            <div className="w-full max-w-xs mt-4 space-y-2">
                <div className="flex items-center gap-2">
                    <label htmlFor="radius" className="font-mono text-yellow-300">r:</label>
                    <input type="range" id="radius" min="1" max="10" step="0.1" value={radius} onChange={e => setRadius(parseFloat(e.target.value))} className="w-full" />
                    <span className="font-mono text-sm w-10 text-right">{radius.toFixed(1)}</span>
                </div>
            </div>
            <p className="mt-2 text-center text-gray-300 font-mono text-lg">Area ≈ <span className="text-yellow-400">{area.toFixed(2)}</span></p>
        </div>
    );
};


const ProbabilityDiagram = ({ data }) => {
    const [balls, setBalls] = useState([]);
    const [drawnBall, setDrawnBall] = useState(null);
    const [counts, setCounts] = useState({ favorable: 0, other: 0 });

    const createBalls = () => Array.from({ length: data.total }).map((_, i) => ({
        id: Math.random(),
        isFavorable: i < data.favorable,
        x: 40 + (i % 8) * 15 + Math.random() * 5,
        y: 90 + Math.floor(i / 8) * 15 + Math.random() * 5,
    }));
    
    useEffect(() => {
        setBalls(createBalls());
        setCounts({ favorable: 0, other: 0 });
        setDrawnBall(null);
    }, [data]);

    const handleDrawBall = () => {
        if (balls.length === 0 || drawnBall) return;
        const randomIndex = Math.floor(Math.random() * balls.length);
        const drawn = balls[randomIndex];
        setDrawnBall({ ...drawn, finalY: 20 });
        
        setTimeout(() => {
            setBalls(balls.filter(b => b.id !== drawn.id));
            setCounts(prev => ({
                ...prev,
                favorable: prev.favorable + (drawn.isFavorable ? 1 : 0),
                other: prev.other + (drawn.isFavorable ? 0 : 1),
            }));
            setDrawnBall(null);
        }, 1500);
    };

    const handleReset = () => {
        setBalls(createBalls());
        setCounts({ favorable: 0, other: 0 });
        setDrawnBall(null);
    }
    
    return (
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">P({data.favorableColor} Ball) = {data.favorable} / {data.total}</h3>
            <style>{`
                .ball-enter { animation: drop-in 0.5s ease-out forwards; }
                .ball-draw { transition: transform 1s ease-in-out; }
                @keyframes drop-in { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
            <svg viewBox="0 0 200 150" className="w-56 h-48">
                <path d="M 30 130 C 30 70, 170 70, 170 130" className="fill-gray-700/50 stroke-gray-500" />
                <ellipse cx="100" cy="75" rx="75" ry="20" className="fill-gray-800 stroke-gray-500" />
                {balls.map((ball) => (
                    <circle key={ball.id} cx={ball.x} cy={ball.y} r="8" className={`fill-current text-${ball.isFavorable ? data.favorableColor : data.otherColor}-500 stroke-black/50 stroke-1 ball-enter`} />
                ))}
                 {drawnBall && (
                    <circle cx={drawnBall.x} cy={drawnBall.y} r="8" className={`fill-current text-${drawnBall.isFavorable ? data.favorableColor : data.otherColor}-500 stroke-black/50 stroke-1 ball-draw`} style={{ transform: `translateY(${drawnBall.finalY - drawnBall.y}px)` }} />
                 )}
            </svg>
            <div className="flex gap-4 mt-2">
                <button onClick={handleDrawBall} disabled={balls.length === 0 || drawnBall} className="px-4 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed">Draw Ball</button>
                <button onClick={handleReset} className="px-4 py-1 bg-gray-600 hover:bg-gray-700 rounded-md">Reset</button>
            </div>
            <div className="mt-4 text-center">
                <p>Drawn:</p>
                <p><span className={`font-bold text-${data.favorableColor}-400`}>{counts.favorable}</span> {data.favorableColor} | <span className={`font-bold text-${data.otherColor}-400`}>{counts.other}</span> {data.otherColor}</p>
            </div>
        </div>
    );
};


const SlopeDiagram = ({ data }) => {
    const [p1, setP1] = useState({x: data.x1, y: data.y1});
    const [p2, setP2] = useState({x: data.x2, y: data.y2});
    
    const rise = p2.y - p1.y;
    const run = p2.x - p1.x;
    const slope = run === 0 ? 'Undefined' : (rise / run).toFixed(2);
    
    const toSvgX = x => 50 + x * 8;
    const toSvgY = y => 50 - y * 8;

    return (
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">Interactive Slope</h3>
            <svg viewBox="0 0 100 100" className="w-56 h-56 bg-gray-900/50 rounded">
                <path d="M 0 50 L 100 50 M 50 0 L 50 100" fill="none" stroke="#4A5568" strokeWidth="0.5" />
                <line x1={toSvgX(p1.x)} y1={toSvgY(p1.y)} x2={toSvgX(p2.x)} y2={toSvgY(p2.y)} className="stroke-cyan-400 stroke-2 transition-all duration-300"/>
                <line x1={toSvgX(p1.x)} y1={toSvgY(p1.y)} x2={toSvgX(p2.x)} y2={toSvgY(p1.y)} className="stroke-red-400 stroke-1 stroke-dasharray-2 transition-all duration-300"/>
                <line x1={toSvgX(p2.x)} y1={toSvgY(p1.y)} x2={toSvgX(p2.x)} y2={toSvgY(p2.y)} className="stroke-green-400 stroke-1 stroke-dasharray-2 transition-all duration-300"/>
                <circle cx={toSvgX(p1.x)} cy={toSvgY(p1.y)} r="2" className="fill-white"/>
                <circle cx={toSvgX(p2.x)} cy={toSvgY(p2.y)} r="2" className="fill-white"/>
            </svg>
             <div className="w-full max-w-xs mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                    <label className="font-mono text-gray-400 w-8">P1:</label>
                    <input type="range" min="-5" max="5" step="0.1" value={p1.x} onChange={e => setP1({...p1, x: parseFloat(e.target.value)})} className="w-full" />
                    <input type="range" min="-5" max="5" step="0.1" value={p1.y} onChange={e => setP1({...p1, y: parseFloat(e.target.value)})} className="w-full" />
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-mono text-gray-400 w-8">P2:</label>
                    <input type="range" min="-5" max="5" step="0.1" value={p2.x} onChange={e => setP2({...p2, x: parseFloat(e.target.value)})} className="w-full" />
                    <input type="range" min="-5" max="5" step="0.1" value={p2.y} onChange={e => setP2({...p2, y: parseFloat(e.target.value)})} className="w-full" />
                </div>
            </div>
            <p className="mt-2 text-center text-gray-300 font-mono text-lg">
                Slope = <span className="text-green-400">{rise.toFixed(1)}</span> / <span className="text-red-400">{run.toFixed(1)}</span> = <span className="text-yellow-400">{slope}</span>
            </p>
        </div>
    );
};


const AlgebraDiagram = ({ data }) => {
    const [step, setStep] = useState(0); // 0: initial, 1: subtracting, 2: solved

    return (
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 h-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Balancing the Equation</h3>
            <style>{`
                .item-fade-out { animation: fade-out 1s ease-out forwards; }
                .beam-tilt { animation: tilt 0.5s ease-in-out forwards; }
                @keyframes fade-out { to { opacity: 0; transform: translateY(-20px); } }
                @keyframes tilt { 0% { transform: rotate(0); } 50% { transform: rotate(${step === 1 ? '2deg' : '0'}); } 100% { transform: rotate(0); } }
            `}</style>
            <svg viewBox="0 0 300 120" className="w-full">
                <g className={step === 1 ? 'beam-tilt' : ''} style={{ transformOrigin: '150px 100px'}}>
                    {/* Beam */}
                    <line x1="10" y1="20" x2="290" y2="20" stroke="white" strokeWidth="3" />
                    {/* Left pan */}
                    <path d="M 40 20 C 20 40, 80 40, 60 20" stroke="gray" strokeWidth="2" fill="none"/>
                    {/* Right pan */}
                    <path d="M 240 20 C 220 40, 280 40, 260 20" stroke="gray" strokeWidth="2" fill="none"/>
                
                    {/* Left items */}
                    <rect x="25" y="-5" width="20" height="20" className="fill-cyan-400" />
                    <text x="35" y="10" fill="black" className="font-bold">x</text>
                    {Array.from({length: 5}).map((_, i) => (
                        <circle key={`l${i}`} cx={55 + i*12} cy="5" r="5" className={`fill-yellow-400 ${step >= 1 ? 'item-fade-out' : ''}`} />
                    ))}
                    {/* Right items */}
                    {Array.from({length: 8}).map((_, i) => (
                         <circle key={`r${i}`} cx={190 + i*12} cy="5" r="5" className={`fill-yellow-400 ${step >= 1 && i >= 3 ? 'item-fade-out' : ''}`} />
                    ))}
                </g>
                {/* Fulcrum */}
                <polygon points="145,100 155,100 150,23" className="fill-gray-600" />
            </svg>
            <div className="flex gap-4 mt-4">
                 <button onClick={() => setStep(s => (s + 1) % 3)} className="px-4 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-md">
                    {step === 0 ? 'Solve' : step === 1 ? 'Result' : 'Reset'}
                 </button>
            </div>
            <div className="mt-4 text-center h-12">
                <p className={`font-mono text-lg transition-opacity duration-500 ${step === 0 ? 'opacity-100' : 'opacity-50'}`}>x + 5 = 8</p>
                <p className={`font-mono text-lg transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>x + 5 - 5 = 8 - 5</p>
                <p className={`font-mono text-xl text-green-400 transition-opacity duration-500 ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>x = 3</p>
            </div>
        </div>
    );
};


const visualMapping = {
  TriangleDiagram,
  TriangleTypes,
  PythagoreanDiagram,
  CircleAreaDiagram,
  ProbabilityDiagram,
  SlopeDiagram,
  AlgebraDiagram,
};


// --- OPTIMIZED EMOTION DETECTION COMPONENT ---
const EmotionDetector = () => {
  const [emotion, setEmotion] = useState("Initializing...");
  const [videoReady, setVideoReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Offscreen canvas for performance-heavy analysis
  const analysisCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // This function analyzes a downscaled video frame for better performance.
  const detectEmotion = (video: HTMLVideoElement) => {
    if (!analysisCanvasRef.current) return;
    const analysisCanvas = analysisCanvasRef.current;
    const ctx = analysisCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Downscale the image for much faster processing
    const analysisWidth = 100;
    const analysisHeight = 75;
    analysisCanvas.width = analysisWidth;
    analysisCanvas.height = analysisHeight;

    ctx.drawImage(video, 0, 0, analysisWidth, analysisHeight);
    const imageData = ctx.getImageData(0, 0, analysisWidth, analysisHeight);
    const data = imageData.data;
    
    let totalBrightness = 0, totalRed = 0, totalGreen = 0, totalBlue = 0;
    const pixelCount = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      totalBrightness += (r + g + b) / 3;
      totalRed += r; totalGreen += g; totalBlue += b;
    }

    const avgBrightness = totalBrightness / pixelCount;
    const avgRed = totalRed / pixelCount;
    const avgGreen = totalGreen / pixelCount;
    const avgBlue = totalBlue / pixelCount;
    
    // Simplified heuristic for emotion detection. Highly dependent on lighting.
    let currentEmotion = "Neutral", confidence = 50, dbg = `Brightness: ${avgBrightness.toFixed(0)}`;
    
    if (avgBrightness > 150) { currentEmotion = "Happy"; confidence = Math.min(90, 50 + (avgBrightness - 150)); }
    else if (avgBrightness < 60) { currentEmotion = "Sad"; confidence = Math.min(85, 50 + (60 - avgBrightness)); }
    else if (avgRed > avgGreen + 10 && avgRed > avgBlue + 10) { currentEmotion = "Excited"; confidence = Math.min(80, 40 + (avgRed - Math.max(avgGreen, avgBlue)) / 2); }
    else if (avgGreen > avgRed + 10 && avgGreen > avgBlue + 10) { currentEmotion = "Focused"; confidence = Math.min(75, 40 + (avgGreen - Math.max(avgRed, avgBlue)) / 2); }
    else { currentEmotion = "Neutral"; confidence = 40 + avgBrightness / 10; }

    setEmotion(`${currentEmotion} (${confidence.toFixed(0)}%)`);
    setDebugInfo(dbg);

    // Draw overlay on the visible canvas
    const displayCtx = canvasRef.current?.getContext('2d');
    if (displayCtx && canvasRef.current) {
        displayCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        displayCtx.strokeStyle = "#00ff00"; displayCtx.lineWidth = 2;
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        displayCtx.strokeRect(width * 0.2, height * 0.2, width * 0.6, height * 0.6);
        displayCtx.fillStyle = "#00ff00"; displayCtx.font = "bold 16px Arial";
        displayCtx.fillText(currentEmotion, 10, 25);
    }
  };

  useEffect(() => {
    analysisCanvasRef.current = document.createElement('canvas');

    const startVideo = async () => {
      try {
        setDebugInfo("Starting camera...");
        if (videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 15 } } });
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => setTimeout(() => {
              if (videoRef.current && videoRef.current.videoWidth > 0 && canvasRef.current) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
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
    if (!videoReady || !videoRef.current) return;
    const video = videoRef.current;
    
    // Run detection more frequently for a smoother feel
    detectionIntervalRef.current = setInterval(() => {
      if (!video || video.paused || video.ended || video.readyState < 4) return;
      try { detectEmotion(video); }
      catch (err) { console.error("Detection error:", err); setEmotion("Detection error"); }
    }, 500);

    return () => { if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current); };
  }, [videoReady]);

  return (
    <div className="mt-8 flex flex-col items-center gap-4 p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold">Emotion Monitor</h2>
      <div className="relative w-full max-w-lg h-64 bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }}/>
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ transform: "scaleX(-1)" }}/>
      </div>
       <div className="text-center">
         <p className="text-white text-lg">Current Emotion: <span className="font-bold text-cyan-300">{emotion}</span></p>
         <p className="text-xs text-gray-400">{debugInfo}</p>
       </div>
    </div>
  );
};


// --- UI SUB-COMPONENTS ---
const Header = ({ onGoBack, isLessonSelected }) => (
    <div className="flex justify-between items-center w-full p-4 bg-gray-800 rounded-lg shadow-lg">
       <button 
          onClick={isLessonSelected ? onGoBack : undefined} 
          className={`flex items-center gap-2 text-lg font-bold text-white transition-colors ${isLessonSelected ? 'hover:text-cyan-300' : 'cursor-default'}`}
        >
          {isLessonSelected && <ChevronLeft size={24} />}
          MATHEMATICS
      </button>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-md text-yellow-400">
          <Star size={20} />
          <span className="font-semibold">10</span>
          <span className="text-gray-400 text-sm hidden sm:inline">Player Level</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-md text-yellow-400">
           <Star size={20} className="fill-yellow-400"/>
          <span className="font-semibold">12</span>
          <span className="text-gray-400 text-sm hidden sm:inline">Total Stars</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-md text-orange-400">
          <Zap size={20} />
          <span className="font-semibold">3</span>
          <span className="text-gray-400 text-sm hidden sm:inline">Day Streak</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-md text-purple-400">
          <BarChart3 size={20} />
          <span className="font-semibold">25000</span>
           <span className="text-gray-400 text-sm hidden sm:inline">Experience</span>
        </div>
      </div>
    </div>
);

const LessonSelector = ({ levels, selectedLevel, onSelectLevel, onSelectLesson, showEmotionDetector, onToggleEmotionDetector }) => {
    const level = levels.find(l => l.id === selectedLevel);
    return (
      <div className="w-full mt-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold text-white">Your Levels</h2>
            <button
                onClick={onToggleEmotionDetector}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-white ${showEmotionDetector ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
                <Zap size={20} />
                {showEmotionDetector ? 'Disable Neuro Feedback' : 'Enable Neuro Feedback'}
            </button>
        </div>
        <div className="flex gap-4 mb-8">
            <button 
                onClick={() => onSelectLevel(1)}
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
                onClick={() => onSelectLesson(lesson)}
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

const VisualizationPanel = ({ lesson, isFullScreen, onToggleFullScreen }) => (
    <div className={`p-4 bg-gray-900 rounded-lg h-full flex flex-col gap-4 overflow-y-auto transition-all duration-300
        ${isFullScreen ? 'fixed inset-0 z-50 p-8' : 'relative'}`}
    >
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-white">Visualizations</h3>
             <button
                onClick={onToggleFullScreen}
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

// --- MAIN PAGE COMPONENT ---
export default function MathematicsPage() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [showEmotionDetector, setShowEmotionDetector] = useState(false);
  
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

    const textToRead = `Lesson: ${selectedLesson.title}. ${selectedLesson.content}. ${selectedLesson.questions.map((q, i) => `Question ${i + 1}: ${q.question}. Explanation: ${q.explanation}.`).join(' ')}`;
    
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

  return (
    <main className="flex h-screen flex-col items-center p-4  sm:p-8 bg-gray-900 text-white font-sans from-gray-900 to-black bg-gradient-to-br">
      <div className="w-full max-w-7xl mx-auto">
        <Header onGoBack={handleGoBack} isLessonSelected={!!selectedLesson} />
        
        {!selectedLesson ? (
          <>
            <LessonSelector 
              levels={demoData.levels}
              selectedLevel={selectedLevel}
              onSelectLevel={setSelectedLevel}
              onSelectLesson={handleSelectLesson}
              showEmotionDetector={showEmotionDetector}
              onToggleEmotionDetector={() => setShowEmotionDetector(!showEmotionDetector)}
            />
            {showEmotionDetector && <EmotionDetector />}
          </>
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
                         <VisualizationPanel 
                           lesson={selectedLesson}
                           isFullScreen={isFullScreen}
                           onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
                          />
                    </div>
                )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

