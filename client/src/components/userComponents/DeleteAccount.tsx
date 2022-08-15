import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import React from "react";
import { useAuthContext } from "../../context/auth";
import { DELETE_ACCOUNT } from "../../graphql/mutations";

const DeleteAccount = () => {
  const { user, deleteUser } = useAuthContext();

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    variables: { userId: user?.id },
    update() {},

  });

  const handleDeleteAccount = () => {
    deleteAccount();
    deleteUser();
  };

  return (
    <div>
      <Button
        // sx={{
        //   backgroundColor: "red",
        // }}
        variant="contained"
        onClick={() => handleDeleteAccount()}
      >
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccount;
