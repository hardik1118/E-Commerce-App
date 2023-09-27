import {
  Box,
  Container,
  CssBaseline,
  useTheme,
  Avatar,
  Typography,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const theme = useTheme();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const { email, password } = e.target;
    await signIn(email.value, password.value);
    navigate("/");
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: theme.palette.secondary.light }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>
        <form
          onSubmit={login}
          sx={{
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            sx={{ mt: 2 }}
            label="Email"
            type="email"
            variant="outlined"
            required
            id="email"
            name="email"
            autoFocus
            autoComplete="off"
            fullWidth
          ></TextField>
          <TextField
            sx={{ mt: 2 }}
            label="Password"
            type="password"
            variant="outlined"
            required
            id="password"
            name="password"
            autoFocus
            autoComplete="off"
            fullWidth
          ></TextField>
          <Button
            type="submit"
            fullWidth
            color="primary"
            sx={{ mt: 2 }}
            variant="contained"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}
