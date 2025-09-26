import LevelProgress from "@/components/LevelProgress";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="w-full ">
      <LevelProgress />
    </div>
  );
};

export default Page;
