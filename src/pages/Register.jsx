import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import { signup } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Register() {

  const navigate = useNavigate();

  const {
    loginWithGoogle,
    loginWithGithub,
  } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [formData, setFormData] = useState({

    fullName: "",

    username: "",

    email: "",

    dateOfBirth: "",

    password: "",

    confirmPassword: "",

  });

  const handleChange = (event) => {

    setFormData({

      ...formData,

      [event.target.name]: event.target.value,

    });

  };

  const getPasswordStrength = () => {

    const password = formData.password;

    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;

  };

  const passwordStrength =
    getPasswordStrength();

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setSuccess("");

    if (!acceptedTerms) {

      setError(
        "Please accept the Terms and Conditions."
      );

      return;

    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;

    }

    try {

      setLoading(true);

      await signup({

        fullName:
          formData.fullName,

        username:
          formData.username,

        email:
          formData.email,

        password:
          formData.password,

        dateOfBirth:
          formData.dateOfBirth,

      });

      setSuccess(

        "Registration successful! Redirecting..."

      );

      setTimeout(() => {

        navigate("/login");

      }, 2000);

    } catch (err) {

      setError(

        err.response?.data?.message ||

        err.response?.data ||

        "Registration failed."

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

        py: 5,

      }}

    >

      <Container maxWidth="sm">

        <Card

          elevation={0}

          sx={{

            borderRadius: 5,

            border: "1px solid #E2E8F0",

          }}

        >

          <CardContent sx={{ p: 5 }}>

            <Stack spacing={3}>

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

                    justifyContent: "center",

                    alignItems: "center",

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

                  Create Account

                </Typography>

                <Typography

                  color="text.secondary"

                  align="center"

                >

                  Join Elevate and boost your productivity.

                </Typography>

              </Stack>

              {error && (

                <Alert severity="error">

                  {error}

                </Alert>

              )}

              {success && (

                <Alert severity="success">

                  {success}

                </Alert>

              )}

              <Button

                fullWidth

                variant="outlined"

                size="large"

                startIcon={<GoogleIcon />}

                onClick={loginWithGoogle}

              >

                Continue with Google

              </Button>

              <Button

                fullWidth

                variant="outlined"

                size="large"

                startIcon={<GitHubIcon />}

                onClick={loginWithGithub}

              >

                Continue with GitHub

              </Button>

              <Divider>

                <Typography color="text.secondary">

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
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    type="date"
                    name="dateOfBirth"
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <TextField
                    fullWidth
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

                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength * 25}
                  />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Password Strength :
                    {" "}
                    {
                      [
                        "Very Weak",
                        "Weak",
                        "Good",
                        "Strong",
                        "Excellent",
                      ][passwordStrength]
                    }
                  </Typography>

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">

                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(
                                !showConfirmPassword
                              )
                            }
                          >

                            {showConfirmPassword ? (
                              <VisibilityOffRoundedIcon />
                            ) : (
                              <VisibilityRoundedIcon />
                            )}

                          </IconButton>

                        </InputAdornment>
                      ),
                    }}
                  />
                                    <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptedTerms}
                        onChange={(event) =>
                          setAcceptedTerms(
                            event.target.checked
                          )
                        }
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Terms & Conditions
                        </Typography>
                        {" "}and{" "}
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Privacy Policy
                        </Typography>
                      </Typography>
                    }
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.6,
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
                      "Create Account"
                    )}
                  </Button>

                </Stack>

              </Box>

              <Divider />

              <Typography
                align="center"
                color="text.secondary"
              >
                Already have an account?{" "}

                <Typography
                  component={Link}
                  to="/login"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  Login
                </Typography>

              </Typography>

              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
              >
                By creating an account you can manage
                your tasks, habits, reminders and
                productivity analytics from one place.
              </Typography>

            </Stack>

          </CardContent>

        </Card>

      </Container>

    </Box>

  );

}