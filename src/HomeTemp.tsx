import { useNavigate } from "react-router-dom";

const HomeTemp = () => {
  const ARUN = "clrxmr5wj0001c5i25cgrpjqt";
  const RANJITHA = "clrz6u0n000004ks6q2bh3eiv";
  const navigate = useNavigate();
  const setLocalStorageUser = async (userId: string) => {
    const user = await localStorage.setItem("currentUser", userId);
    navigate("/boards/all");
  };
  return (
    <div className="flex text-gray-100 flex-col justify-center items-center w-full gap-4">
      <div>Home Temporary</div>
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
