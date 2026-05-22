import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === "admin" ? "/admin" : "/home");
    }
  }, [currentUser, navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      setError("Invalid email or password");
      return;
    }
    setError("");
  }

  if (!currentUser) {
    return (
      <Container maxWidth="xs">
        <Box sx={{ mt: 10, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" align="center">
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </form>
          <Typography align="center" variant="body2">
            No account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Box>
      </Container>
    );
  }

  return null;
}