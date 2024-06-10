import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { fetchOrders, placeOrder } from "../redux/order.slice/order.slice";
import { removeFromCart } from "../redux/cart.slice/cart.slice";
import { removeFromWishList } from "../redux/wishList.slice/wishList.slice";
import { Box, MenuItem, Typography } from "@mui/material";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa6";
import {
  FormContainer,
  Title,
  Form,
  InputGroup,
  StyledInput,
  SubmitButton,
} from "../styles/forms/StylesOrderForm";
import MaskedInput from "../components/MaskedInput/MaskedInput";
import useToken from "../hooks/useToken";
import * as Yup from "yup";
import { grid } from "ldrs";
import { useState } from "react";

const validateCardNumber = (value) => {
  const cleanValue = value.replace(/\s+/g, "");
  let sum = 0;
  let shouldDouble = false;

  for (let i = cleanValue.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanValue[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      "The card number must have 16 numbers"
    )
    .test("test-card-number", "Invalid card number", (value) =>
      validateCardNumber(value)
    ),
  monthOfDate: Yup.string().required("Month required"),
  yearOfDate: Yup.string().required("Year required"),
  cvvCode: Yup.string().required("Code required"),
  customerName: Yup.string().required("Name is required"),
  customerSurname: Yup.string().required("Surname is required"),
  adress: Yup.string().required("Address is required"),
  country: Yup.string().required("Country required"),
  city: Yup.string().required("City required"),
  postIndex: Yup.string()
    .required("Postal code is required")
    .matches(/^\d{5}$/, "The postal code must have 5 numbers"),
  phone: Yup.string()
    .required("Phone number required")
    .matches(
      /^\+\d{3} \d{2} \d{3} \d{4}$/,
      "The phone must be in the format +XXXXXXXXXXX"
    ),
});

const getYears = (startYear) => {
  const currentYear = new Date().getFullYear() + 10;
  let years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push({ value: year, label: year });
  }
  return years;
};
const years = getYears(2025);

const getMonth = () => {
  let months = [];
  for (let month = 1; month <= 12; month++) {
    months.push({
      value: month,
      label: month < 10 ? `0${month}` : `${month}`,
    });
  }
  return months;
};
const months = getMonth();

const countries = [
  { value: "Ukraine", label: "Ukraine" },
  { value: "USA", label: "USA" },
  { value: "Poland", label: "Poland" },
];

export default function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useToken();
  grid.register();

  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      monthOfDate: "",
      yearOfDate: "",
      cvvCode: "",
      customerName: "",
      customerSurname: "",
      adress: "",
      country: "",
      city: "",
      postIndex: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const valuesWithUserId = {
        ...values,
        userId: user?._id,
      };
      setIsLoading(true);
      try {
        const response = await dispatch(placeOrder(valuesWithUserId)).unwrap();

        if (response) {
          for (const item of cart.products) {
            const id = item.product._id;

            await dispatch(removeFromCart({ id, token })).unwrap();

            if (wishList?.products?.some((el) => el._id === item.product._id)) {
              await dispatch(removeFromWishList({ id, token })).unwrap();
            }
          }

          dispatch(fetchOrders(token));

          navigate("/products/library");
        }
      } catch (error) {
        console.error("Failed to place order and update cart/wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCancel = () => {
    navigate("/cart");
  };

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            position: "fixed",
            left: "0%",
            top: 0,
            zIndex: 100,
            backgroundColor: "#fff",
          }}
        >
          <l-grid
            size="160"
            speed="1"
            color="black"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1330,
            }}
          ></l-grid>
        </Box>
      )}
      <Box sx={{ minHeight: "calc(100vh - 272px)" }}>
        <FormContainer>
          <Title variant="h4">PAYMENT METHOD</Title>

          <Form onSubmit={formik.handleSubmit}>
            <InputGroup>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <MaskedInput
                  id="cardNumber"
                  label="Card number"
                  mask="9999 9999 9999 9999"
                  placeholder="XXXX XXXX XXXX XXXX"
                  autoComplete="off"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardNumber &&
                    Boolean(formik.errors.cardNumber)
                  }
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                  }
                  sx={{ width: { xs: "auto", md: "360px" } }}
                />
                <Box
                  sx={{
                    display: "flex",
                    width: { xs: "auto", md: "360px" },
                    gap: "15px",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <StyledInput
                    select
                    id="monthDate"
                    name="monthOfDate"
                    label="month"
                    value={formik.values.monthOfDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.monthOfDate &&
                      Boolean(formik.errors.monthOfDate)
                    }
                    helperText={
                      formik.touched.monthOfDate && formik.errors.monthOfDate
                    }
                    sx={{ width: { xs: "auto", md: "120px" } }}
                  >
                    {months.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </StyledInput>

                  <StyledInput
                    select
                    id="yearDate"
                    name="yearOfDate"
                    label="year"
                    value={formik.values.yearOfDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.yearOfDate &&
                      Boolean(formik.errors.yearOfDate)
                    }
                    helperText={
                      formik.touched.yearOfDate && formik.errors.yearOfDate
                    }
                    sx={{ width: { xs: "auto", md: "120px" } }}
                  >
                    {years.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </StyledInput>

                  <MaskedInput
                    id="cvvCode"
                    label="CVV code"
                    placeholder="XXX"
                    mask="999"
                    autoComplete="off"
                    value={formik.values.cvvCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.cvvCode && Boolean(formik.errors.cvvCode)
                    }
                    helperText={formik.touched.cvvCode && formik.errors.cvvCode}
                    sx={{ width: { xs: "auto", md: "120px" } }}
                  />
                </Box>
              </Box>
            </InputGroup>

            <Title variant="h6" sx={{ marginTop: "25px" }}>
              BILLING INFORMATION
            </Title>
            <InputGroup
              sx={{
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: { xs: "nowrap", md: "wrap" },
                  width: { xs: "auto", md: "min-content" },
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <StyledInput
                  id="customerName"
                  label="First name"
                  value={formik.values.customerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.customerName &&
                    Boolean(formik.errors.customerName)
                  }
                  helperText={
                    formik.touched.customerName && formik.errors.customerName
                  }
                  sx={{ width: { xs: "auto", md: "175px" } }}
                />

                <StyledInput
                  id="customerSurname"
                  label="Last name"
                  value={formik.values.customerSurname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.customerSurname &&
                    Boolean(formik.errors.customerSurname)
                  }
                  helperText={
                    formik.touched.customerSurname &&
                    formik.errors.customerSurname
                  }
                  sx={{ width: { xs: "auto", md: "175px" } }}
                />
                <MaskedInput
                  id="phone"
                  label="Phone number"
                  autoComplete="on"
                  mask="+999 99 999 9999"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  sx={{ width: { xs: "auto", md: "360px" } }}
                />

                <StyledInput
                  id="adress"
                  label="Billing address"
                  value={formik.values.adress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.adress && Boolean(formik.errors.adress)}
                  helperText={formik.touched.adress && formik.errors.adress}
                  sx={{ width: { xs: "auto", md: "360px" } }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: { xs: "nowrap", md: "wrap" },

                  flexDirection: { xs: "column", md: "row" },

                  width: { xs: "auto", md: "min-content" },
                }}
              >
                <StyledInput
                  select
                  id="Country"
                  name="country"
                  autoComplete="on"
                  label="Country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                  sx={{ width: { xs: "auto", md: "360px" } }}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledInput>

                <StyledInput
                  id="city"
                  label="City "
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  sx={{ width: { xs: "auto", md: "360px" } }}
                />

                <MaskedInput
                  id="postIndex"
                  label="Zip code"
                  autoComplete="on"
                  mask="99999"
                  value={formik.values.postIndex}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.postIndex && Boolean(formik.errors.postIndex)
                  }
                  helperText={
                    formik.touched.postIndex && formik.errors.postIndex
                  }
                  sx={{ width: { xs: "auto", md: "360px" } }}
                />
              </Box>
            </InputGroup>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <SubmitButton
                type="button"
                onClick={() => {
                  formik.setErrors({});
                  handleCancel();
                }}
                variant="outlined"
                sx={{
                  color: "#000",
                  "&:hover": {
                    borderColor: "#000",
                    opacity: 0.8,
                  },
                }}
              >
                Cancel
              </SubmitButton>
              <SubmitButton
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  "&:hover": {
                    backgroundColor: "#000",
                    opacity: 0.8,
                  },
                }}
              >
                Continue
              </SubmitButton>
            </Box>
          </Form>
        </FormContainer>
        <Box
          sx={{
            position: "absolute",
            top: "150px",
            right: "20px",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            width: "280px",
            boxShadow: 5,
            borderRadius: 2,
            padding: "10px",
            gap: "10px",
            backgroundColor: "#bdbdbd",
            pb: "3px",
          }}
        >
          <Typography
            sx={{
              width: "auto",
            }}
            variant="h5"
            component="h5"
          >
            PAYMENT METHODS
          </Typography>

          <Typography variant="p" component="p">
            We accept the following secure payment methods:
          </Typography>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <FaCcMastercard style={{ width: "60px", height: "60px" }} />
            <FaCcVisa style={{ width: "60px", height: "60px" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
