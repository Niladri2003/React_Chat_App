import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";
import { useEffect } from "react";
import {
  FriendElement,
  FriendRequestElement,
  UserElement,
} from "../../components/Friends";

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUsers);
  }, []);
  const { users } = useSelector((state) => state.app);

  return (
    <>
      {users.map((el, idx) => {
        return (
          <>
            <UserElement key={el._id} {...el} />
          </>
        );
      })}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends);
  }, []);
  const { friends } = useSelector((state) => state.app);

  return (
    <>
      {friends.map((el, idx) => {
        return (
          <>
            <FriendElement key={el._id} {...el} />
          </>
        );
      })}
    </>
  );
};

const FriendRequestList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriendRequests);
  }, []);
  const { friendRequest } = useSelector((state) => state.app);

  return (
    <>
      {friendRequest.map((el, idx) => {
        //el=>{_id, sender:{_id,firstName, lastName,img,online}}
        return (
          <>
            <FriendRequestElement key={el._id} {...el.sender} id={el._id} />
          </>
        );
      })}
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requets" />
        </Tabs>
      </Stack>
      {/* Dialogue content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0: // display all users
                  return <UserList />;
                case 1: //display all friends
                  return <FriendsList />;
                case 2: //display all friend Requests
                  return <FriendRequestList />;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
