import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "./axios";

const HomeTemp = () => {
  // const ARUN = "clrxmr5wj0001c5i25cgrpjqt";
  const ARUN = "clsko1pg600007gb98mvirva1";
  const RANJITHA = "clsnebkji00017gb9lm1zxu5q";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setLocalStorageUser = async (userId: string) => {
    queryClient.invalidateQueries();
    await localStorage.setItem("currentUser", userId);
    axiosClient.defaults.headers.Authorization = userId;
    navigate("/boards/all");
  };
  return (
    <div className="flex text-gray-100 flex-col justify-center items-center w-full gap-4">
      <div>Home Temporary</div>
      <div>Select a User</div>
      <div className="flex gap-2 justify-center">
        <div
          className="border-2 border-gray-50 p-2 rounded-md hover:cursor-pointer"
          onClick={() => setLocalStorageUser(ARUN)}
        >
          Arun
        </div>
        <div
          className="border-2 border-gray-50 p-2 rounded-md hover:cursor-pointer"
          onClick={() => setLocalStorageUser(RANJITHA)}
        >
          Ranjitha
        </div>
      </div>
    </div>
  );
};

export default HomeTemp;
