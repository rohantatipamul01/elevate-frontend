import { useEffect, useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useProfile } from "../context/ProfileContext";
import { useDashboard } from "../context/DashboardContext";

export default function Profile() {

  const {
    profile,
    loading,
    error,
    saveProfile,
    saveProfileImage,
    updateUserPassword,
  } = useProfile();

  const { dashboard } = useDashboard();

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    location: "",
    bio: "",
    dateOfBirth: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {

    if (profile) {

      setFormData({

        fullName: profile.fullName || "",

        username: profile.username || "",

        phone: profile.phone || "",

        location: profile.location || "",

        bio: profile.bio || "",

        dateOfBirth: profile.dateOfBirth || "",

      });

    }

  }, [profile]);

  const handleChange = (event) => {

    setFormData({

      ...formData,

      [event.target.name]: event.target.value,

    });

  };

  const handlePasswordChange = (event) => {

    setPasswordData({

      ...passwordData,

      [event.target.name]: event.target.value,

    });

  };

  const handleProfileSave = async () => {

    try {

      await saveProfile(formData);

      setSuccess("Profile updated successfully.");

    } catch {

      setSuccess("");

    }

  };

  const handleImageUpload = async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    try {

      await saveProfileImage(file);

      setSuccess("Profile picture updated.");

    } catch {

      setSuccess("");

    }

  };

  const handlePasswordSave = async () => {

    try {

      await updateUserPassword(passwordData);

      setPasswordData({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

      });

      setSuccess("Password changed successfully.");

    } catch {

      setSuccess("");

    }

  };

  if (loading && !profile) {

    return (

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ py: 10 }}
      >

        <CircularProgress />

      </Stack>

    );

  }

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        My Profile
      </Typography>

      {error && (

        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>

      )}

      {success && (

        <Alert
          severity="success"
          sx={{ mb: 3 }}
        >
          {success}
        </Alert>

      )}

      <Grid
        container
        spacing={3}
      >

        <Grid
          item
          xs={12}
          md={4}
        >

          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #E2E8F0",
            }}
          >

            <CardContent>

              <Stack
                spacing={3}
                alignItems="center"
              >

                <Avatar
                  src={
                    profile?.profileImage
                      ? `http://localhost:8084${profile.profileImage}`
                      : ""
                  }
                  sx={{
                    width: 140,
                    height: 140,
                    bgcolor: "primary.main",
                    fontSize: 50,
                  }}
                >
                  {profile?.fullName?.charAt(0)}
                </Avatar>

                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<EditRoundedIcon />}
                >
                  Change Photo

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                </Button>

                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {profile?.fullName}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  @{profile?.username}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  {profile?.email}
                </Typography>

              </Stack>

            </CardContent>

          </Card>

        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >

          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #E2E8F0",
            }}
          >

            <CardContent>

              <Stack
                direction="row"
                spacing={1}
                mb={3}
                alignItems="center"
              >

                <PersonRoundedIcon />

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  Personal Information
                </Typography>

              </Stack>

              <Grid
                container
                spacing={3}
              >

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    label="Email"
                    value={profile?.email || ""}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<SaveRoundedIcon />}
                    onClick={handleProfileSave}
                  >
                    Save Changes
                  </Button>
                </Grid>

              </Grid>

            </CardContent>

          </Card>
                    <Card
            elevation={0}
            sx={{
              mt: 3,
              borderRadius: 4,
              border: "1px solid #E2E8F0",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
              >
                Change Password
              </Typography>

              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    fullWidth
                    type="password"
                    label="Current Password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePasswordSave}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Grid>

        <Grid
          item
          xs={12}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #E2E8F0",
            }}
          >
            <CardContent>

              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
              >
                Account Statistics
              </Typography>

              <Grid
                container
                spacing={3}
              >

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total Tasks
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                  >
                    {dashboard.totalTasks}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Completed
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="success.main"
                  >
                    {dashboard.completedTasks}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Current Streak
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="warning.main"
                  >
                    🔥 {dashboard.streak}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Productivity
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {Math.round(
                      dashboard.productivity
                    )}
                    %
                  </Typography>
                </Grid>

              </Grid>

            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Box>

  );

}