import { cn } from "@/lib/utils";
import React from "react";

interface ILoaderProps {
  className?: string;
}
export const Loader: React.FC<ILoaderProps> = ({
  className = "text-white",
}) => {
  return (
    <div className="flex justify-center items-center py-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};

export default Loader;
