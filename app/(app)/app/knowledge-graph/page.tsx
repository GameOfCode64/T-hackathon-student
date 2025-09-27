'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Share2, Droplets, BookOpen, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

// --- TYPE DEFINITIONS for TypeScript ---
interface Node {
    id: string;
    group: string;
    label: string;
    size?: 'large';
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

interface Link {
    source: string;
    target: string;
}

interface GraphData {
    nodes: Node[];
    links: Link[];
}

interface AllGraphData {
    [key: string]: GraphData;
}

// --- KNOWLEDGE GRAPH DATA ---
const allGraphData: AllGraphData = {
    'Photosynthesis': {
        nodes: [
            { id: 'Photosynthesis', group: 'center', label: 'Photosynthesis' },
            { id: 'Biology', group: 'subject', label: 'BIOLOGY' },
            { id: 'Physics', group: 'subject', label: 'PHYSICS' },
            { id: 'Chemistry', group: 'subject', label: 'CHEMISTRY' },
            { id: 'Art & Design', group: 'subject', label: 'ART & DESIGN' },
            { id: 'Environmental Science', group: 'subject', label: 'ENVIRONMENTAL SCIENCE' },
            { id: 'Ecosystems', group: 'biology', label: 'Ecosystems & Food Webs' },
            { id: 'Evolutionary Biology', group: 'biology', label: 'Evolutionary Biology' },
            { id: 'Cellular Respiration', group: 'biology', label: 'Cellular Respiration' },
            { id: 'Chlorophyll', group: 'physics', label: 'Chlorophyll: Light Absorption', size: 'large' },
            { id: 'Energy Conversion P', group: 'physics', label: 'Energy Conversion' },
            { id: 'Chemical Equation', group: 'chemistry', label: 'Chemical Equation' },
            { id: 'Glucose', group: 'chemistry', label: 'Glucose (C₆H₁₂O₆)' },
            { id: 'Energy Conversion C', group: 'chemistry', label: 'Energy Conversion' },
            { id: 'Color Theory', group: 'art', label: 'Color Theory (Green Pigment)' },
            { id: 'Botanical Illustration', group: 'art', label: 'Botanical Illustration' },
            { id: 'Oxygen Production', group: 'env_sci', label: 'Oxygen Production' },
            { id: 'Climate Change', group: 'env_sci', label: 'Climate Change' },
            { id: 'Biomass Energy', group: 'env_sci', label: 'Biomass Energy' },
        ],
        links: [
            { source: 'Photosynthesis', target: 'Biology' }, { source: 'Photosynthesis', target: 'Physics' }, { source: 'Photosynthesis', target: 'Chemistry' }, { source: 'Photosynthesis', target: 'Art & Design' }, { source: 'Photosynthesis', target: 'Environmental Science' },
            { source: 'Biology', target: 'Ecosystems' }, { source: 'Biology', target: 'Evolutionary Biology' }, { source: 'Biology', target: 'Cellular Respiration' },
            { source: 'Physics', target: 'Chlorophyll' }, { source: 'Physics', target: 'Energy Conversion P' },
            { source: 'Chemistry', target: 'Chemical Equation' }, { source: 'Chemistry', target: 'Glucose' }, { source: 'Chemistry', target: 'Energy Conversion C' },
            { source: 'Art & Design', target: 'Color Theory' }, { source: 'Art & Design', target: 'Botanical Illustration' },
            { source: 'Environmental Science', target: 'Oxygen Production' }, { source: 'Environmental Science', target: 'Climate Change' }, { source: 'Environmental Science', target: 'Biomass Energy' },
        ],
    },
    'Pythagorean Theorem': {
        nodes: [
            { id: 'Pythagorean Theorem', group: 'center', label: 'Pythagorean Theorem' },
            { id: 'Geometry', group: 'subject', label: 'GEOMETRY' },
            { id: 'Trigonometry', group: 'subject', label: 'TRIGONOMETRY' },
            { id: 'Physics', group: 'subject', label: 'PHYSICS' },
            { id: 'Architecture', group: 'subject', label: 'ARCHITECTURE' },
            { id: 'Navigation', group: 'subject', label: 'NAVIGATION' },
            { id: 'Right Triangles', group: 'geometry', label: 'Right-Angled Triangles' },
            { id: 'Distance Formula', group: 'geometry', label: 'Distance Formula' },
            { id: 'Sine, Cosine, Tangent', group: 'trigonometry', label: 'Sine, Cosine, Tangent' },
            { id: 'Vectors', group: 'physics', label: 'Vector Calculation' },
            { id: 'Construction', group: 'architecture', label: 'Building & Construction' },
            { id: 'GPS Systems', group: 'navigation', label: 'GPS Systems' },
        ],
        links: [
            { source: 'Pythagorean Theorem', target: 'Geometry' }, { source: 'Pythagorean Theorem', target: 'Trigonometry' }, { source: 'Pythagorean Theorem', target: 'Physics' }, { source: 'Pythagorean Theorem', target: 'Architecture' }, { source: 'Pythagorean Theorem', target: 'Navigation'},
            { source: 'Geometry', target: 'Right Triangles' }, { source: 'Geometry', target: 'Distance Formula' },
            { source: 'Trigonometry', target: 'Sine, Cosine, Tangent' },
            { source: 'Physics', target: 'Vectors' },
            { source: 'Architecture', target: 'Construction' },
            { source: 'Navigation', target: 'GPS Systems' },
        ]
    },
    'Water Cycle': {
        nodes: [
            { id: 'Water Cycle', group: 'center', label: 'The Water Cycle' },
            { id: 'Meteorology', group: 'subject', label: 'METEOROLOGY' },
            { id: 'Geography', group: 'subject', label: 'GEOGRAPHY' },
            { id: 'Biology', group: 'subject', label: 'BIOLOGY' },
            { id: 'Chemistry', group: 'subject', label: 'CHEMISTRY' },
            { id: 'Evaporation', group: 'meteorology', label: 'Evaporation' },
            { id: 'Condensation', group: 'meteorology', label: 'Condensation (Clouds)' },
            { id: 'Precipitation', group: 'meteorology', label: 'Precipitation' },
            { id: 'Rivers & Oceans', group: 'geography', label: 'Rivers & Oceans' },
            { id: 'Erosion', group: 'geography', label: 'Erosion' },
            { id: 'Transpiration', group: 'biology', label: 'Transpiration in Plants' },
            { id: 'States of Matter', group: 'chemistry', label: 'States of Matter' },
        ],
        links: [
            { source: 'Water Cycle', target: 'Meteorology' }, { source: 'Water Cycle', target: 'Geography' }, { source: 'Water Cycle', target: 'Biology' }, { source: 'Water Cycle', target: 'Chemistry' },
            { source: 'Meteorology', target: 'Evaporation' }, { source: 'Meteorology', target: 'Condensation' }, { source: 'Meteorology', target: 'Precipitation' },
            { source: 'Geography', target: 'Rivers & Oceans' }, { source: 'Geography', target: 'Erosion' },
            { source: 'Biology', target: 'Transpiration' },
            { source: 'Chemistry', target: 'States of Matter' },
        ]
    }
};


// --- COLOR AND STYLE MAPPING ---
const colorMapping: { [key: string]: any } = {
    center: '#adff2f',
    subject: {
        'Biology': '#facc15', 'Physics': '#60a5fa', 'Chemistry': '#818cf8',
        'Art & Design': '#ef4444', 'Environmental Science': '#34d399', 'Geometry': '#a78bfa',
        'Trigonometry': '#f472b6', 'Architecture': '#fb923c', 'Navigation': '#f87171',
        'Meteorology': '#22d3ee', 'Geography': '#34d399',
    },
    biology: '#fde047', physics: '#93c5fd', chemistry: '#a5b4fc',
    art: '#fca5a5', env_sci: '#6ee7b7', geometry: '#c4b5fd',
    trigonometry: '#fbcfe8', architecture: '#fcd34d', navigation: '#fecaca',
    meteorology: '#67e8f9', geography: '#a7f3d0',
};

// --- INTERACTIVE GRAPH COMPONENT ---
const InteractiveKnowledgeGraph = ({ data }: { data: GraphData }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const layout = useMemo(() => {
        if (dimensions.width === 0 || !data) return { nodes: [], links: [] };
        
        const nodePositions = new Map<string, { x: number; y: number }>();
        const positionedNodes: Node[] = [];

        const centerNode = data.nodes.find(n => n.group === 'center');
        if (centerNode) {
            const centerPos = { x: 0, y: 0 };
            nodePositions.set(centerNode.id, centerPos);
            positionedNodes.push({ ...centerNode, ...centerPos });
        }

        const subjectNodes = data.nodes.filter(n => n.group === 'subject');
        const subjectAngleStep = (2 * Math.PI) / subjectNodes.length;
        const subjectRadius = Math.min(dimensions.width, dimensions.height) / 3.2; // Increased spacing

        subjectNodes.forEach((node, i) => {
            const angle = i * subjectAngleStep - Math.PI / 2;
            const pos = {
                x: subjectRadius * Math.cos(angle),
                y: subjectRadius * Math.sin(angle),
            };
            nodePositions.set(node.id, pos);
            positionedNodes.push({ ...node, ...pos });

            const childNodes = data.nodes.filter(n => data.links.some(l => l.source === node.id && l.target === n.id));
            const childRadius = 130; // Increased spacing
            const childAngleStep = 0.55; // Increased spacing
            const startAngle = angle - (childAngleStep * (childNodes.length - 1)) / 2;

            childNodes.forEach((child, j) => {
                const childAngle = startAngle + j * childAngleStep;
                const childPos = {
                    x: pos.x + childRadius * Math.cos(childAngle),
                    y: pos.y + childRadius * Math.sin(childAngle),
                };
                nodePositions.set(child.id, childPos);
                positionedNodes.push({ ...child, ...childPos });
            });
        });
        
        const positionedLinks = data.links.map(link => ({
            ...link,
            sourcePos: nodePositions.get(link.source),
            targetPos: nodePositions.get(link.target),
        }));

        return { nodes: positionedNodes, links: positionedLinks };
    }, [data, dimensions]);

    // D3 Zoom/Pan Effect
    useEffect(() => {
        if (!(window as any).d3 || !svgRef.current) return;
        const d3 = (window as any).d3;
        const svg = d3.select(svgRef.current);
        const g = svg.select("g.graph-content");

        const zoom = d3.zoom()
            .scaleExtent([0.3, 3])
            .on("zoom", (event: any) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

        const handleZoomIn = () => svg.transition().duration(250).call(zoom.scaleBy, 1.3);
        const handleZoomOut = () => svg.transition().duration(250).call(zoom.scaleBy, 1 / 1.3);
        const handleZoomReset = () => svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
        
        d3.select("#zoom-in").on("click", handleZoomIn);
        d3.select("#zoom-out").on("click", handleZoomOut);
        d3.select("#zoom-reset").on("click", handleZoomReset);
        
        svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);

        return () => {
           svg.on(".zoom", null); 
        };
    }, [data, dimensions]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {dimensions.width > 0 && (
                <>
                    <svg ref={svgRef} width="100%" height="100%" viewBox={`${-dimensions.width / 2} ${-dimensions.height / 2} ${dimensions.width} ${dimensions.height}`}>
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="7" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <g className="graph-content">
                            {layout.links.map((link, i) => (
                                <line key={i} x1={link.sourcePos?.x} y1={link.sourcePos?.y} x2={link.targetPos?.x} y2={link.targetPos?.y}
                                    stroke={colorMapping.subject[link.source as string] || colorMapping.subject[link.target as string] || '#999'}
                                    strokeWidth="2.5" strokeOpacity="0.9" />
                            ))}
                            {layout.nodes.map(node => {
                                const width = node.size === 'large' ? 180 : (node.label.length * (node.group === 'subject' ? 8.5 : 7.5) + 24);
                                const height = node.group === 'center' ? 60 : (node.size === 'large' ? 60 : 36);
                                const color = node.group === 'center' ? colorMapping.center : node.group === 'subject' ? colorMapping.subject[node.id] : colorMapping[node.group];
                                const lines = node.size === 'large' ? node.label.split(': ') : [node.label];
                                const lineHeight = 1.2; // em units

                                return (
                                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                                        <rect x={-width / 2} y={-height / 2} width={width} height={height} rx={node.group === 'center' ? 30 : 18} fill={color} style={{ filter: node.group === 'center' ? 'url(#glow)' : 'none' }} />
                                        <text
                                            fill="black"
                                            fontWeight="bold"
                                            fontSize={node.group === 'subject' ? '12px' : '11px'}
                                            textAnchor="middle"
                                            dominantBaseline="central"
                                            y={-(lines.length - 1) * 0.5 * lineHeight + 'em'}
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            {lines.map((line, i) => (
                                                <tspan key={i} x="0" dy={i > 0 ? `${lineHeight}em` : '0.1em'}>
                                                    {line}
                                                </tspan>
                                            ))}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                    <div className="absolute bottom-6 right-8 z-10 flex flex-col items-center gap-2">
                        <button id="zoom-in" className="p-3 bg-gray-700/80 rounded-full hover:bg-cyan-500 transition-colors"><ZoomIn size={20}/></button>
                        <button id="zoom-out" className="p-3 bg-gray-700/80 rounded-full hover:bg-cyan-500 transition-colors"><ZoomOut size={20}/></button>
                        <button id="zoom-reset" className="p-3 bg-gray-700/80 rounded-full hover:bg-cyan-500 transition-colors"><RefreshCw size={20}/></button>
                    </div>
                </>
            )}
        </div>
    );
};


// --- MAIN KNOWLEDGE GRAPH PAGE COMPONENT ---
export default function KnowledgeGraphPage() {
    const [activeTopic, setActiveTopic] = useState('Photosynthesis');
    const [d3Instance, setD3Instance] = useState<any>(null);

    useEffect(() => {
        if ((window as any).d3) {
            setD3Instance((window as any).d3);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://d3js.org/d3.v7.min.js';
        script.async = true;
        script.onload = () => {
            setD3Instance((window as any).d3);
        };
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <main
            className="flex h-screen w-full flex-col bg-gray-900 text-white font-sans overflow-hidden"
            style={{ backgroundImage: `radial-gradient(circle, #1a202c 0%, #000000 70%)` }}
        >
            <div className="absolute top-6 left-6 z-10 flex items-center gap-4 p-2 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                 <button onClick={() => setActiveTopic('Photosynthesis')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition ${activeTopic === 'Photosynthesis' ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    <Share2 size={16}/>Photosynthesis
                </button>
                <button onClick={() => setActiveTopic('Pythagorean Theorem')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition ${activeTopic === 'Pythagorean Theorem' ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    <BookOpen size={16}/>Pythagorean Theorem
                </button>
                 <button onClick={() => setActiveTopic('Water Cycle')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition ${activeTopic === 'Water Cycle' ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    <Droplets size={16}/>Water Cycle
                </button>
            </div>
            <div className="flex-grow w-full h-full">
                {d3Instance ? <InteractiveKnowledgeGraph data={allGraphData[activeTopic]} /> : <div className="flex items-center justify-center h-full text-xl font-semibold">Loading Graph Engine...</div>}
            </div>
            <a href="/courses" className="absolute top-6 right-8 text-gray-400 hover:text-white transition-colors" title="Close">
                <X size={32} />
            </a>
        </main>
    );
}

