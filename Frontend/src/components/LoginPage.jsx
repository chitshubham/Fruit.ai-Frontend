import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
  Link,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  Visibility,
  VisibilityOff,
  Fingerprint,
  MailOutline,
  LockOutlined,
} from "@mui/icons-material";
import "../style/LoginPage.css"; // Make sure to style it further for the final design
import { useNavigate } from "react-router-dom"; // Correct import for `useNavigate`

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const navigate = useNavigate(); // Initialize `useNavigate`

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    let emailError = "";
    let passwordError = "";

    if (!email.includes("@")) {
      emailError = "Please enter a valid email.";
    }

    if (password.length < 6) {
      passwordError = "Password must be at least 6 characters long.";
    }

    if (emailError || passwordError) {
      setError({ email: emailError, password: passwordError });
    } else {
      // Perform login logic (e.g., API call)
      console.log("Logging in with:", { email, password, remember });

      // Navigate to the home page after successful login
      navigate("/home");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        marginTop: "50px",
        padding: "20px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        gutterBottom
        style={{ marginBottom: "30px" }}
      >
        By signing in you are agreeing to our{" "}
        <Link href="#">Term and privacy policy</Link>
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item>
          <Link href="#" underline="none" variant="body1" fontWeight="bold">
            Login
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" underline="none" variant="body1" color="textSecondary">
            Register
          </Link>
        </Grid>
      </Grid>

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error.email}
          helperText={error.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error.password}
          helperText={error.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Checkbox
              value="remember"
              color="primary"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <Typography variant="body2" display="inline">
              Remember password
            </Typography>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" style={{ color: "#007bff" }}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            marginTop: "20px",
            backgroundColor: "#007bff",
            padding: "10px 0",
          }}
        >
          Login
        </Button>
      </form>

      <Typography variant="body2" style={{ marginTop: "20px" }}>
        or connect with
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "10px" }}
      >
        <Grid item>
          <IconButton color="primary" aria-label="login with Facebook">
            <Facebook />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="secondary" aria-label="login with Instagram">
            <Instagram />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            style={{ color: "#BD081C" }}
            aria-label="login with Pinterest"
          >
            <Pinterest />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            style={{ color: "#0077b5" }}
            aria-label="login with LinkedIn"
          >
            <LinkedIn />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <IconButton
          style={{
            backgroundColor: "#0077b5",
            padding: "20px",
            borderRadius: "50%",
            color: "#fff",
          }}
          aria-label="login with fingerprint"
        >
          <Fingerprint fontSize="large" />
        </IconButton>
      </Grid>
    </Container>
  );
};

export default Login;
