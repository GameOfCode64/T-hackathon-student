"use client";

import React, { useState, useEffect } from "react";

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

// First attempt questions
const quizSet1: Question[] = [
  { id: 1, question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: "12" },
  { id: 2, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
  { id: 3, question: "Who wrote Hamlet?", options: ["Shakespeare", "Wordsworth", "Milton", "Keats"], answer: "Shakespeare" },
  { id: 4, question: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Kyoto"], answer: "Tokyo" },
  { id: 5, question: "What is H2O commonly called?", options: ["Salt", "Water", "Oxygen", "Hydrogen"], answer: "Water" },
  { id: 6, question: "Which gas do humans exhale?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
  { id: 7, question: "What is 9 × 9?", options: ["72", "81", "99", "100"], answer: "81" },
  { id: 8, question: "Which is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" },
  { id: 9, question: "What is the freezing point of water?", options: ["0°C", "100°C", "50°C", "32°C"], answer: "0°C" },
  { id: 10, question: "Which continent is India in?", options: ["Asia", "Europe", "Africa", "Australia"], answer: "Asia" },
];

// Retry quiz questions
const quizSet2: Question[] = [
  { id: 1, question: "What is 15 - 7?", options: ["7", "8", "9", "10"], answer: "8" },
  { id: 2, question: "Which gas do plants release during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: "Oxygen" },
  { id: 3, question: "Who painted the Mona Lisa?", options: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Michelangelo"], answer: "Leonardo da Vinci" },
  { id: 4, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { id: 5, question: "Which is the fastest land animal?", options: ["Tiger", "Cheetah", "Horse", "Lion"], answer: "Cheetah" },
  { id: 6, question: "What is 8 × 6?", options: ["42", "46", "48", "54"], answer: "48" },
  { id: 7, question: "Which organ pumps blood?", options: ["Lungs", "Heart", "Liver", "Kidney"], answer: "Heart" },
  { id: 8, question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
  { id: 9, question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
  { id: 10, question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
];

const QuizPage = () => {
  const [quiz, setQuiz] = useState<Question[]>(quizSet1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timePerQuestion, setTimePerQuestion] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  // Stopwatch
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Start timer when question loads
  useEffect(() => {
    setStartTime(Date.now());
  }, [currentIndex]);

  const handleAnswer = (option: string) => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    setAnswers({ ...answers, [quiz[currentIndex].id]: option });
    setTimePerQuestion({ ...timePerQuestion, [quiz[currentIndex].id]: timeTaken });

    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let sc = 0;
    quiz.forEach((q) => {
      if (answers[q.id] === q.answer) sc++;
    });
    setScore(sc);
    setSubmitted(true);

    if (sc >= 6) {
      alert("🎉 You are eligible for the next lesson!");
    } else if (sc <= 5 && retryCount === 0) {
      alert("⚠️ Please retry the quiz with a new set of questions.");
      setQuiz(quizSet2);
      setAnswers({});
      setTimePerQuestion({});
      setCurrentIndex(0);
      setRetryCount(1);
      setSubmitted(false);
    } else {
      alert("❌ You still scored low. A notification has been sent to the teacher.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>

      {!submitted ? (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-lg text-center">
          <p className="mb-4 font-semibold">{quiz[currentIndex].question}</p>
          <div className="flex flex-col gap-2">
            {quiz[currentIndex].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 text-white"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <p className="mb-2">Score: {score} / {quiz.length}</p>
          <p className="mb-4">Time Taken (per question):</p>
          <ul className="list-disc pl-6">
            {Object.entries(timePerQuestion).map(([id, time]) => (
              <li key={id}>
                Question {id}: {time}s {time > 60 && "⚠️ (Teacher notified)"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
