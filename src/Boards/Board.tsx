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
    <Link to={`/boards/${id}`}>
      <div className="flex justify-start items-center gap-2 py-3 md:hover:border-2 border-opacity-30 rounded-xl border-border md:hover:px-4 transition-all duration-300 ease-in-out">
        <div className="h-20 w-20 bg-secondary rounded-full ">
          <img src={image} className="h-20 w-20 rounded-md object-cover" />
        </div>
        <div className="flex flex-col px-2 flex-1 gap-1 ">
          <p className="text-foreground text-lg">{name}</p>
          <p className="text-foreground text-xs opacity-60 line-clamp-3 md:max-w-md">
            {description}
          </p>
          <div className="flex gap-2 justify-start items-baseline flex-1">
            <p className="text-muted-foreground text-xs items-baseline flex">
              {numberOfPeople} 👥
            </p>
            {/* <p className="text-gray-100 text-xs border-2 px-3 py-0.5 rounded-md border-gray-700 hover:cursor-pointer"> */}
            {/*   join */}
            {/* </p> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Board;
