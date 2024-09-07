import { IStreak, IUser } from "@/api/boards/boards.types";
import React from "react";
import LogStreakDialog from "./LogStreakDrawer";
import LogListDrawer from "./LogListDrawer";
import { checkIfLessThanOrEqualToYesterday } from "@/api/boards/boards.utils";
import LogListCalendarDrawer from "./LogListCalendarDrawer";
import LogListCalendarDialog from "./LogListCalendarDrawer";
interface IUserProps {
  users?: Array<IUser>;
}
export const UserViewRow = ({
  user,
  userStreak,
}: {
  user: IUser;
  userStreak?: IStreak;
}) => {
  const showMarkStreak =
    (userStreak?.updated_at &&
      new Date(userStreak?.updated_at).getDate() < new Date().getDate()) ||
    userStreak?.current_streak === 0;
  return (
    <div className="flex justify-between items-center">
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
            {userStreak?.current_streak
              ? userStreak?.current_streak <= 1
                ? `${userStreak?.current_streak.toString()} day streak`
                : `${userStreak?.current_streak.toString()} days streak`
              : ""}
          </p>
        </div>
      </div>
      {userStreak && (
        <div className="flex gap-2">
          {showMarkStreak && <LogStreakDialog userStreak={userStreak} />}
          <LogListCalendarDrawer streakId={userStreak.id} />

          {/* <LogListDrawer streakId={userStreak.id} /> */}
        </div>
      )}
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
