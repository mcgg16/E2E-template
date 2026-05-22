import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Paper, Button, Chip } from "@mui/material";
import { useAuth } from "../context/useAuth";
export default function HomePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (!currentUser) return null;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h4" align="center">
          Welcome, {currentUser.name}!
        </Typography>
        <Paper
          elevation={3}
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h6">Your Info</Typography>
          <Typography>
            <strong>Name:</strong> {currentUser.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {currentUser.email}
          </Typography>
          <Typography>
            <strong>Role:</strong>{" "}
            <Chip
              label={currentUser.role}
              color={currentUser.role === "admin" ? "primary" : "default"}
              size="small"
            />
          </Typography>
          <Typography>
            <strong>Status:</strong>{" "}
            <Chip
              label={currentUser.active ? "Active" : "Inactive"}
              color={currentUser.active ? "success" : "error"}
              size="small"
            />
          </Typography>
        </Paper>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
