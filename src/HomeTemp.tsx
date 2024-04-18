import { useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "./axios";
import { useEffect } from "react";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
const HomeTemp = () => {
  // const ARUN = "clrxmr5wj0001c5i25cgrpjqt";
  const ARUN = "clsko1pg600007gb98mvirva1";
  const RANJITHA = "clsnebkji00017gb9lm1zxu5q";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <>
      <div className="flex text-gray-100 flex-col justify-center items-center w-full gap-4">
        <p>Welcome to Awestreak!</p>
        <div className="flex flex-col">
          <p>Discover Boards</p>
          <p>My Boards</p>
        </div>
      </div>
    </>
  );
};

export default HomeTemp;
