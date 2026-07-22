import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";

export default function OAuthSuccess() {

  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    const id = params.get("id");

    const fullName = params.get("fullName");

    const username = params.get("username");

    const email = params.get("email");

    const image = params.get("image");

    if (!token) {

      navigate("/login");

      return;

    }

    login(

      token,

      {

        id,

        fullName,

        username,

        email,

        profileImage: image,

      }

    );

    navigate("/dashboard", {

      replace: true,

    });

  }, [login, navigate]);

  return (

    <Box

      sx={{

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

      }}

    >

      <Stack

        spacing={3}

        alignItems="center"

      >

        <CircularProgress size={70} />

        <Typography

          variant="h5"

          fontWeight={700}

        >

          Signing you in...

        </Typography>

      </Stack>

    </Box>

  );

}