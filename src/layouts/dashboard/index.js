import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { isLoggedin } = useSelector((state) => state.auth);
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
