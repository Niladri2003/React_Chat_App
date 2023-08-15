import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { showSnackbar } from "../../redux/slices/app";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedin } = useSelector((state) => state.auth);
  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedin) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = Window.location + "#loaded";
          window.location.reload();
        }
      };
      window.onload();
      if (!socket) {
        connectSocket(user_id);
      }
      // new_friend request
      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("request_accepted", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("request_Sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
    }
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_Sent");
    };
  }, [isLoggedin, socket]);
  if (!isLoggedin) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Sidebar */}
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
