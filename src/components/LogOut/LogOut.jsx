import { Box } from "@mui/material";
import {
  FormContainer,
  Title,
  SignButton,
} from "../../styles/forms/StylesAuthForm.js";
import { persistor } from "../../redux/store";

export default function Logout({ handleClose }) {
  const handleLogout = () => {
    persistor.purge();
    window.location.href = "/";
  };

  return (
    <>
      <FormContainer>
        <Title>Are you sure?</Title>
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            mt: "40px",
          }}
        >
          <SignButton onClick={handleClose}>Cancel</SignButton>
          <SignButton onClick={handleLogout}>Logout</SignButton>
        </Box>
      </FormContainer>
    </>
  );
}
