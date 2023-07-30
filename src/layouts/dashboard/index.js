import React from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const theme = useTheme();
  console.log(theme);

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
