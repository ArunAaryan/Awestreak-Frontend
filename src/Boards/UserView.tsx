import React from "react";
import { IUser } from "@/types";
interface IUserProps {
  users?: Array<IUser>;
}
const UserView: React.FC<IUserProps> = ({ users }) => {
  return (
    <div className="flex flex-col">
      {users &&
        users.map((user) => (
          <div className="flex gap-2 justify-start items-center py-3 rounded-xl">
            <div className="flex flex-col p-2">
              <div className="h-10 w-10 bg-teal-300 rounded-full flex items-center justify-center flex-col">
                {user.image && (
                  <img
                    src={user.image}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                {!user?.image && (
                  <p className="text-lg text-gray-200 font-semibold">
                    {user.name.slice(0, 1)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-gray-100 text-sm ">{user.name}</p>
              <p className="text-gray-100 text-xs opacity-50 ">
                {user.current_streak?.toString() ?? 0} days streak
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserView;
