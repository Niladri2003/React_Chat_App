import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../data";
import {
  Docmsg,
  Linkmsg,
  MediaMsg,
  ReplyMSg,
  TextMsg,
  Timeline,
} from "./MessageType";
import { useTheme } from "@mui/material/styles";

const Message = ({ menu }) => {
  const theme = useTheme();
  return (
    <Box
      p={3}
      sx={{
        backgroundColor: theme.palette.mode === "light" && "#eef5ed",
      }}
    >
      <Stack spacing={3}>
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              //Timeline
              return <Timeline el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  //image
                  return <MediaMsg el={el} menu={menu} />;

                case "doc":
                  //document
                  return <Docmsg el={el} menu={menu} />;

                case "link":
                  //document
                  return <Linkmsg el={el} menu={menu} />;

                case "reply":
                  //reply
                  return <ReplyMSg el={el} menu={menu} />;

                default:
                  //text
                  return <TextMsg el={el} menu={menu} />;
              }

            default:
              <></>;
              break;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
