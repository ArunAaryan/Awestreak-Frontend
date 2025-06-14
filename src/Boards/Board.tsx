import { IBoardProps } from "@/api/boards/boards.types";
import React from "react";
import { Link } from "react-router-dom";

const Board: React.FC<IBoardProps> = ({
  id,
  name,
  numberOfPeople,
  image,
  description,
}) => {
  return (
    <Link to={`/boards/${id}`} aria-label={`View board: ${name}`} tabIndex={0}>
      <div className="flex justify-start items-center gap-4 py-4 px-3 bg-background rounded-xl shadow-md hover:shadow-lg hover:scale-[1.025] border border-border transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary outline-none cursor-pointer group">
        <div className="h-20 w-20 bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="h-20 w-20 rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col px-2 flex-1 gap-1 ">
          <div className="flex items-center gap-2">
            <p className="text-foreground text-lg font-semibold">{name}</p>
            {/* Privacy badge placeholder */}
            {/* <span className="ml-2 px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">Private</span> */}
          </div>
          <p className="text-foreground text-xs opacity-60 line-clamp-3 md:max-w-md">
            {description}
          </p>
          <div className="flex gap-2 justify-start items-baseline flex-1 mt-1">
            <p className="text-muted-foreground text-xs items-baseline flex">
              {numberOfPeople} <span className="ml-1">👥</span>
            </p>
            {/* Add more info here if available, e.g., last updated, owner */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Board;
