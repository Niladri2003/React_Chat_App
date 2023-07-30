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

const Message = () => {
  return (
    <Box p={3}>
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
                  return <MediaMsg el={el} />;

                case "doc":
                  //document
                  return <Docmsg el={el} />;

                case "link":
                  //document
                  return <Linkmsg el={el} />;

                case "reply":
                  //reply
                  return <ReplyMSg el={el} />;

                default:
                  //text
                  return <TextMsg el={el} />;
              }

              break;
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
