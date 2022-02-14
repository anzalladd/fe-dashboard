/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/user-context";
import CommonService from "../service/CommonService";

export default function ProtectedRoute(props: { children: any }) {
  const navigate = useNavigate();
  const { state, dispatch } = useUser();

  const getMe = useCallback(async () => {
    try {
      const response = await CommonService.getMe();
      dispatch({
        type: "getUser",
        user: response.data.data,
        isLoading: false,
      });
      navigate("/dashboard");
      return;
    } catch (e) {
      dispatch({
        type: "getUser",
        user: {},
        isLoading: false,
      });
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    getMe();
    return () => {};
  }, []);

  if(state.isLoading) return null

  return props.children;
}
