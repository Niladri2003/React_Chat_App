import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
const GeneralApp = () => {
  const { sidebar } = useSelector((store) => store.app);

  const theme = useTheme();
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* {chats} */}
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 740px )" : "calc(100vw - 420px )",
          backgroundColor:
            theme.palette.mode === "light"
              ? "fff"
              : theme.palette.background.default,
        }}
      >
        {/* Conversation */}
        <Conversation />
      </Box>
      {/* Contact */}
      {sidebar.open && <Contact />}
    </Stack>
  );
};

export default GeneralApp;
