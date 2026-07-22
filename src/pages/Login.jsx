import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const {
    login: authLogin,
    loginWithGoogle,
    loginWithGithub,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });

  const handleChange = (event) => {

    setFormData((previous) => ({

      ...previous,

      [event.target.name]: event.target.value,

    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    try {

      setLoading(true);

      const response = await login(formData);

      authLogin(

        response.token,

        response.user

      );

      navigate("/dashboard", {

        replace: true,

      });

    } catch (err) {

      setError(

        err.response?.data?.message ||

        err.response?.data ||

        "Invalid email or password."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box

      sx={{

        minHeight: "100vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        bgcolor: "#F8FAFC",

        px: 2,

      }}

    >

      <Container maxWidth="sm">

        <Card

          elevation={0}

          sx={{

            borderRadius: 5,

            border: "1px solid #E2E8F0",

            overflow: "hidden",

          }}

        >

          <CardContent sx={{ p: 5 }}>

            <Stack

              spacing={3}

            >

              <Stack

                alignItems="center"

                spacing={1}

              >

                <Box

                  sx={{

                    width: 72,

                    height: 72,

                    borderRadius: "50%",

                    bgcolor: "primary.main",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                  }}

                >

                  <TrendingUpRoundedIcon

                    sx={{

                      color: "#fff",

                      fontSize: 40,

                    }}

                  />

                </Box>

                <Typography

                  variant="h4"

                  fontWeight={700}

                >

                  Welcome Back

                </Typography>

                <Typography

                  color="text.secondary"

                  align="center"

                >

                  Login to continue your productivity journey.

                </Typography>

              </Stack>

              {error && (

                <Alert severity="error">

                  {error}

                </Alert>

              )}

              <Button

                fullWidth

                variant="outlined"

                startIcon={<GoogleIcon />}

                size="large"

                onClick={loginWithGoogle}

              >

                Continue with Google

              </Button>

              <Button

                fullWidth

                variant="outlined"

                startIcon={<GitHubIcon />}

                size="large"

                onClick={loginWithGithub}

              >

                Continue with GitHub

              </Button>

              <Divider>

                <Typography

                  variant="body2"

                  color="text.secondary"

                >

                  OR

                </Typography>

              </Divider>

              <Box

                component="form"

                onSubmit={handleSubmit}

              >

                <Stack spacing={3}>

                  <TextField

                    fullWidth

                    required

                    label="Email Address"

                    name="email"

                    type="email"

                    value={formData.email}

                    onChange={handleChange}

                  />

                  <TextField

                    fullWidth

                    required

                    label="Password"

                    name="password"

                    type={

                      showPassword

                        ? "text"

                        : "password"

                    }

                    value={formData.password}

                    onChange={handleChange}

                    InputProps={{

                      endAdornment: (

                        <InputAdornment position="end">

                          <IconButton

                            onClick={() =>

                              setShowPassword(

                                !showPassword

                              )

                            }

                          >

                            {showPassword ? (

                              <VisibilityOffRoundedIcon />

                            ) : (

                              <VisibilityRoundedIcon />

                            )}

                          </IconButton>

                        </InputAdornment>

                      ),

                    }}

                  />
                                    <Box
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Typography
                      component={Link}
                      to="/forgot-password"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        color="inherit"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>

                </Stack>

              </Box>

              <Divider />

              <Typography
                align="center"
                color="text.secondary"
              >
                Don't have an account?{" "}

                <Typography
                  component={Link}
                  to="/register"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  Create Account
                </Typography>

              </Typography>

              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                By continuing, you agree to our
                {" "}
                <Typography
                  component="span"
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Terms of Service
                </Typography>
                {" "}
                and
                {" "}
                <Typography
                  component="span"
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Privacy Policy
                </Typography>
              </Typography>

            </Stack>

          </CardContent>

        </Card>

      </Container>

    </Box>

  );

}