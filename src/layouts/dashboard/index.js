import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";

const isAuth = true;

const DashboardLayout = () => {
  if (!isAuth) {
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
