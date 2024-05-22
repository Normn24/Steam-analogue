import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const user = useSelector((state) => state.user.user);

  return (
    <Container maxWidth="md">
      <Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
        >
          <Typography variant="h4" component="h4" sx={{ fontWeight: "700" }}>
            My profile
          </Typography>
          <Button variant="outlined" size="small">
            Delete account
          </Button>
        </Box>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="first-name"
                label="First name"
                placeholder={user.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last name"
                id="last-name"
                placeholder={user.lastName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                id="email"
                placeholder={user.email}
                type="email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                id="phone"
                placeholder={user.phone}
                type="tel"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                autoComplete="on"
                label="New Password"
                id="new-password"
                placeholder="••••••••"
                type="password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                autoComplete="on"
                label="Confirm Password"
                id="confirm-password"
                placeholder="••••••••"
                type="password"
              />
            </Grid>
          </Grid>
        </form>
        <Box sx={{ mt: "18px" }}>
          <Button variant="contained">Save changes</Button>
        </Box>
      </Box>
    </Container>
  );
}
