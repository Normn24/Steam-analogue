import InputMask from "react-input-mask";
import { StyledInput } from "../../styles/forms/StylesOrderForm";

const MaskedInput = ({
  mask,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  ...props
}) => {
  return (
    <InputMask mask={mask} value={value} onChange={onChange} onBlur={onBlur}>
      {(inputProps) => (
        <StyledInput
          {...inputProps}
          {...props}
          error={error}
          helperText={helperText}
        />
      )}
    </InputMask>
  );
};

export default MaskedInput;
