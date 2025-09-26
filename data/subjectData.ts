import maths from "@/public/images/maths.jpg";
import science from "@/public/images/science.jpg";
import cs from "@/public/images/cs.jpg";
import history from "@/public/images/history.jpg";
import english from "@/public/images/english.jpg";

export const SubjectData = [
  {
    id: 1,
    subject: "Mathematics",
    description: "Learn the fundamentals of algebra, geometry, and calculus.",
    imageUrl: maths,
    link: "courses/mathematics",
    courseCompleted: 90,
  },
  {
    id: 2,
    subject: "Science",
    description: "Explore the world of physics, chemistry, and biology.",
    imageUrl: science,
    link: "courses/science",
    courseCompleted: 30,
  },
  {
    id: 3,
    subject: "History",
    description: "Dive into ancient civilizations and modern history.",
    imageUrl: history,
    link: "courses/history",
    courseCompleted: 10,
  },
  {
    id: 4,
    subject: "English",
    description: "Improve your grammar, vocabulary, and writing skills.",
    imageUrl: english,
    link: "courses/english",
    courseCompleted: 50,
  },
  {
    id: 5,
    subject: "Computer Science",
    description: "Learn programming, algorithms, and data structures.",
    imageUrl: cs,
    link: "courses/computer-science",
    courseCompleted: 1,
  },
];
