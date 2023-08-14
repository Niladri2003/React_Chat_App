import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/Logo_V2.ico";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { isLoggedin } = useSelector((state) => state.auth);
  console.log(isLoggedin);
  if (isLoggedin) {
    return <Navigate to={"/app"} />;
  }
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction={"column"}
            alignItems={"center"}
          >
            <img style={{ height: 110 }} src={Logo} alt="Logo" />
          </Stack>
        </Stack>

        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
