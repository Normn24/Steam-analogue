import { useRef, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import {
  InputGroup,
  InputLabel,
  StyledInput,
} from "../../styles/forms/StylesAuthForm";
import { PiEye, PiEyeClosed } from "react-icons/pi";

function PasswordInput({ label, formik, formikValues }) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleClickShowPassword = () => {
    const { selectionStart, selectionEnd } = inputRef.current;

    setShowPassword((show) => !show);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(selectionStart, selectionEnd);
      }
    }, 0);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <InputGroup>
      <InputLabel htmlFor={formikValues}>{label}</InputLabel>
      <StyledInput
        id={formikValues}
        name={formikValues}
        type={showPassword ? "text" : "password"}
        autoComplete="on"
        value={formik.values[formikValues]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched[formikValues] && Boolean(formik.errors[formikValues])
        }
        helperText={formik.touched[formikValues] && formik.errors[formikValues]}
        inputRef={inputRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <PiEye style={{color: "var(--text-color)"}} /> : <PiEyeClosed style={{color: "var(--text-color)"}}/>}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </InputGroup>
  );
}

export default PasswordInput;
