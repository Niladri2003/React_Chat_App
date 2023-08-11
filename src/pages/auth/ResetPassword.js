import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <Stack sx={{ mb: 5, position: "relative" }} spacing={2}>
        <Typography variant="h3" paragraph>
          Forgot Your Password
        </Typography>
        <Typography>
          Please enter the email address associated with your account and we
          will email you a link to reset your password.
        </Typography>
        {/* Reset Password form */}
        <ResetPasswordForm />
        <Link
          component={RouterLink}
          to="/auth/login"
          color="inherit"
          variant="subtitle2"
          sx={{ mt: 3, mx: "auto", alignItems: "center" }}
        >
          <CaretLeft />
          Return to Sign in
        </Link>
      </Stack>
    </>
  );
};

export default ResetPassword;
