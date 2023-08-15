import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import SarredMessages from "../../components/SarredMessages";
const GeneralApp = () => {
  const { sidebar, chat_type, room_id } = useSelector((store) => store.app);

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
        {room_id !== null && chat_type === "individual" ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="subtitle2">
              Select a coversation or start a new one
            </Typography>
          </Stack>
        )}
        {/* Conversation */}
      </Box>
      {/* Contact */}
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;

            case "STARRED":
              return <SarredMessages />;

            case "SHARED":
              return <SharedMessages />;

            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
