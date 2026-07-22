import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function Landing() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <TaskAltRoundedIcon color="primary" sx={{ fontSize: 42 }} />,
      title: "Task Management",
      description:
        "Create, organize, prioritize and complete your daily tasks effortlessly.",
    },
    {
      icon: (
        <LocalFireDepartmentRoundedIcon
          color="error"
          sx={{ fontSize: 42 }}
        />
      ),
      title: "Habit Tracking",
      description:
        "Build powerful habits with streak tracking and consistency insights.",
    },
    {
      icon: (
        <CalendarMonthRoundedIcon
          color="success"
          sx={{ fontSize: 42 }}
        />
      ),
      title: "Smart Calendar",
      description:
        "Visualize tasks, reminders and habits in one unified calendar.",
    },
    {
      icon: (
        <AutoGraphRoundedIcon
          color="warning"
          sx={{ fontSize: 42 }}
        />
      ),
      title: "Analytics",
      description:
        "Powerful dashboards and productivity reports with beautiful charts.",
    },
    {
      icon: (
        <NotificationsActiveRoundedIcon
          color="secondary"
          sx={{ fontSize: 42 }}
        />
      ),
      title: "Smart Reminders",
      description:
        "Never miss deadlines with intelligent reminder scheduling.",
    },
    {
      icon: (
        <RocketLaunchRoundedIcon
          color="primary"
          sx={{ fontSize: 42 }}
        />
      ),
      title: "AI Productivity",
      description:
        "Improve focus using AI powered productivity insights and recommendations.",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      {/* ================= NAVBAR ================= */}

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(20px)",
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <TrendingUpRoundedIcon
                color="primary"
                sx={{
                  fontSize: 42,
                }}
              />

              <Typography
                variant="h4"
                fontWeight={800}
              >
                Elevate
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
            >
              <Button
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ================= HERO ================= */}

      <Container maxWidth="xl">
        <Grid
          container
          spacing={8}
          alignItems="center"
          sx={{
            py: {
              xs: 8,
              md: 14,
            },
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Chip
              label="🚀 AI Powered Productivity Platform"
              color="primary"
            />

            <Typography
              variant="h2"
              fontWeight={900}
              mt={3}
              lineHeight={1.1}
            >
              Manage Tasks.
              <br />

              Build Habits.
              <br />

              <Box
                component="span"
                color="primary.main"
              >
                Achieve More.
              </Box>
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mt: 4,
                maxWidth: 600,
              }}
            >
              Elevate helps you organize work, build
              powerful habits, monitor productivity,
              schedule reminders and achieve your goals
              from one intelligent dashboard.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              mt={5}
            >
              <Button
                size="large"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate("/register")}
              >
                Start Free
              </Button>

              <Button
                size="large"
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={5}
              mt={7}
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  color="primary"
                >
                  10K+
                </Typography>

                <Typography color="text.secondary">
                  Tasks Managed
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  color="success.main"
                >
                  5K+
                </Typography>

                <Typography color="text.secondary">
                  Habits Built
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  color="warning.main"
                >
                  95%
                </Typography>

                <Typography color="text.secondary">
                  Productivity
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Dashboard Preview */}

          <Grid
            item
            xs={12}
            md={6}
          >
            <Card
              elevation={10}
              sx={{
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    Dashboard Preview
                  </Typography>

                  <Chip
                    label="Live Demo"
                    color="success"
                  />
                </Stack>

                <Grid
                  container
                  spacing={2}
                  mt={1}
                >
                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 3,
                      }}
                    >
                      <Typography
                        color="text.secondary"
                      >
                        Productivity
                      </Typography>

                      <Typography
                        variant="h4"
                        fontWeight={700}
                      >
                        92%
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={92}
                        sx={{ mt: 2 }}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 3,
                      }}
                    >
                      <Typography
                        color="text.secondary"
                      >
                        Streak
                      </Typography>

                      <Typography
                        variant="h4"
                        fontWeight={700}
                      >
                        🔥 21
                      </Typography>

                      <Typography
                        variant="body2"
                        color="success.main"
                      >
                        Days
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 3,
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography
                          fontWeight={700}
                        >
                          Today's Tasks
                        </Typography>

                        <DashboardRoundedIcon
                          color="primary"
                        />
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      <Stack spacing={2}>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <CheckCircleRoundedIcon color="success" />
                          <Typography>
                            Finish React Dashboard
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <CheckCircleRoundedIcon color="success" />
                          <Typography>
                            Spring Boot API
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <Avatar
                            sx={{
                              width: 28,
                              height: 28,
                              bgcolor: "warning.main",
                            }}
                          >
                            3
                          </Avatar>

                          <Typography>
                            Remaining Tasks
                          </Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
            {/* ================= FEATURES ================= */}

      <Box
        sx={{
          py: 12,
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            fontWeight={800}
            align="center"
            gutterBottom
          >
            Everything You Need To Stay Productive
          </Typography>

          <Typography
            color="text.secondary"
            align="center"
            sx={{
              mb: 8,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Elevate combines task management, habit tracking,
            analytics, reminders and calendar planning into one
            modern productivity platform.
          </Typography>

          <Grid
            container
            spacing={4}
          >
            {features.map((feature) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={feature.title}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 5,
                    border: 1,
                    borderColor: "divider",
                    transition: "0.35s",

                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    {feature.icon}

                    <Typography
                      variant="h5"
                      fontWeight={700}
                      mt={3}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={2}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= WHY ELEVATE ================= */}

      <Container
        maxWidth="xl"
        sx={{ py: 12 }}
      >
        <Grid
          container
          spacing={8}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="h3"
              fontWeight={800}
              gutterBottom
            >
              Why Choose Elevate?
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              mb={5}
            >
              Designed for students, professionals and teams
              who want to increase productivity without
              switching between multiple applications.
            </Typography>

            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={2}
              >
                <CheckCircleRoundedIcon color="success" />

                <Box>
                  <Typography fontWeight={700}>
                    AI Powered Productivity
                  </Typography>

                  <Typography color="text.secondary">
                    Personalized insights based on your work
                    habits and completion history.
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
              >
                <CheckCircleRoundedIcon color="success" />

                <Box>
                  <Typography fontWeight={700}>
                    Everything In One Place
                  </Typography>

                  <Typography color="text.secondary">
                    Tasks, habits, reminders, analytics and
                    calendar integrated seamlessly.
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
              >
                <CheckCircleRoundedIcon color="success" />

                <Box>
                  <Typography fontWeight={700}>
                    Beautiful Dashboard
                  </Typography>

                  <Typography color="text.secondary">
                    Modern interface with detailed charts,
                    statistics and productivity reports.
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
              >
                <CheckCircleRoundedIcon color="success" />

                <Box>
                  <Typography fontWeight={700}>
                    Secure Authentication
                  </Typography>

                  <Typography color="text.secondary">
                    Spring Security + JWT Authentication
                    protects your productivity data.
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={6}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Typography
                    variant="h3"
                    color="primary"
                    fontWeight={800}
                  >
                    99%
                  </Typography>

                  <Typography mt={2}>
                    User Satisfaction
                  </Typography>
                </Card>
              </Grid>

              <Grid
                item
                xs={6}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Typography
                    variant="h3"
                    color="success.main"
                    fontWeight={800}
                  >
                    24/7
                  </Typography>

                  <Typography mt={2}>
                    Productivity Tracking
                  </Typography>
                </Card>
              </Grid>

              <Grid
                item
                xs={6}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Typography
                    variant="h3"
                    color="warning.main"
                    fontWeight={800}
                  >
                    AI
                  </Typography>

                  <Typography mt={2}>
                    Smart Insights
                  </Typography>
                </Card>
              </Grid>

              <Grid
                item
                xs={6}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Typography
                    variant="h3"
                    color="secondary.main"
                    fontWeight={800}
                  >
                    ∞
                  </Typography>

                  <Typography mt={2}>
                    Unlimited Growth
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
            {/* ================= CALL TO ACTION ================= */}

      <Box
        sx={{
          py: 12,
          background: `linear-gradient(135deg,
            ${theme.palette.primary.main},
            ${theme.palette.secondary.main})`,
          color: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            spacing={4}
            alignItems="center"
            textAlign="center"
          >
            <Typography
              variant="h3"
              fontWeight={800}
            >
              Ready To Transform Your Productivity?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                maxWidth: 750,
              }}
            >
              Join thousands of users who organize their work,
              build better habits and achieve more every day
              with Elevate.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <Button
                variant="contained"
                size="large"
                color="inherit"
                sx={{
                  color: "primary.main",
                  px: 5,
                  py: 1.5,
                  fontWeight: 700,
                }}
                onClick={() => navigate("/register")}
              >
                Create Free Account
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  px: 5,
                  py: 1.5,

                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ================= FOOTER ================= */}

      <Box
        sx={{
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              xs={12}
              md={5}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <TrendingUpRoundedIcon
                  color="primary"
                  sx={{
                    fontSize: 38,
                  }}
                />

                <Typography
                  variant="h4"
                  fontWeight={800}
                >
                  Elevate
                </Typography>
              </Stack>

              <Typography
                color="text.secondary"
                mt={3}
                sx={{
                  maxWidth: 420,
                }}
              >
                Elevate is a modern AI-powered productivity
                platform built using React, Spring Boot,
                JWT Authentication and MySQL to help people
                manage tasks, habits, reminders and analytics
                in one beautiful application.
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
            >
              <Typography
                fontWeight={700}
                mb={2}
              >
                Product
              </Typography>

              <Stack spacing={1}>
                <Button
                  color="inherit"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>

                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
            >
              <Typography
                fontWeight={700}
                mb={2}
              >
                Features
              </Typography>

              <Stack spacing={1}>
                <Typography color="text.secondary">
                  Task Manager
                </Typography>

                <Typography color="text.secondary">
                  Habit Tracker
                </Typography>

                <Typography color="text.secondary">
                  Calendar
                </Typography>

                <Typography color="text.secondary">
                  Analytics
                </Typography>
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={3}
            >
              <Typography
                fontWeight={700}
                mb={2}
              >
                Built With
              </Typography>

              <Stack spacing={1}>
                <Typography color="text.secondary">
                  React 19 + Vite
                </Typography>

                <Typography color="text.secondary">
                  Material UI
                </Typography>

                <Typography color="text.secondary">
                  Spring Boot 3
                </Typography>

                <Typography color="text.secondary">
                  JWT Authentication
                </Typography>

                <Typography color="text.secondary">
                  MySQL Database
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          <Typography
            align="center"
            color="text.secondary"
          >
            © 2026 Elevate • AI Powered Productivity &
            Habit Tracker • Built with ❤️ using React,
            Spring Boot & MySQL
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}