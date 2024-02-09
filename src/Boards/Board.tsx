import { IUser } from "@/types";
import React from "react";
import { Link } from "react-router-dom";

const Board: React.FC<IBoardProps> = ({
  id,
  name,
  numberOfPeople,
  image,
  description,
}) => {
  console.log(description);
  return (
    <Link to={`/boards/${id}`}>
      <div className="flex justify-start items-center gap-2 py-3  hover:border-2 border-opacity-30 rounded-xl border-gray-600 hover:px-4 transition-all duration-300">
        <div className="h-20 w-20 bg-teal-300 rounded-full ">
          <img src={image} className="h-20 w-20 rounded-full object-cover" />
        </div>
        <div className="flex flex-col px-2 flex-1 gap-2">
          <p className="text-gray-100 text-lg">{name}</p>
          <p className="text-gray-100 text-xs opacity-60">{description}</p>
          <div className="flex gap-2  justify-start items-baseline flex-1">
            <p className="text-gray-200 text-xs items-baseline flex">
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
