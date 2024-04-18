import { IUser } from "@/api/boards/boards.types";
import React from "react";
interface IUserProps {
  users?: Array<IUser>;
}
const UserViewRow = ({ user }: { user: IUser }) => {
  return (
    <div
      className="flex gap-2 justify-start items-center py-3 rounded-xl transition-all duration-1000"
      key={user.id}
    >
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
  );
};

const UserView: React.FC<IUserProps> = ({ users }) => {
  // show current user
  return (
    <div className="flex flex-col">
      {/* // show current user here */}
      {users && users.map((user) => <UserViewRow key={user.id} user={user} />)}
    </div>
  );
};

export default UserView;
