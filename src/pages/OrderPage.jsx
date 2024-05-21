import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../redux/order.slice/order.slice";
import { removeFromCart } from "../redux/cart.slice/cart.slice";
import { removeFromWishList } from "../redux/wishList.slice/wishList.slice";
import * as Yup from "yup";
import { useFormik } from "formik";
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

const validationSchema = Yup.object().shape({
  payWay: Yup.string().required("You must select a payment method"),
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      "The card number must be in the format XXXX XXXX XXXX XXXX"
    ),
  monthOfDate: Yup.string().required("Month required"),
  yearOfDate: Yup.string().required("Year required"),
  cvvCode: Yup.string()
    .required("CVV code required")
    .matches(/^\d{3}$/, "CVV code must be in the format XXX"),
  customerName: Yup.string().required("Name is required"),
  customerSurname: Yup.string().required("Surname is required"),
  adress: Yup.string().required("Address is required"),
  country: Yup.string().required("Country required"),
  city: Yup.string().required("City required"),
  postIndex: Yup.string()
    .required("Postal code is required")
    .matches(/^\d{5}$/, "The postal code must be in the format XXXXX"),
  phone: Yup.string()
    .required("Phone number required")
    .matches(
      /^\+\d{3} \d{3}-\d{3}-\d{2}$/,
      "The phone must be in the format +XXXXXXXXXX"
    ),
});

const paySystem = [
  { value: "Visa", label: "Visa" },
  { value: "Mastercard", label: "Mastercard" },
];

const getYears = (startYear) => {
  const currentYear = new Date().getFullYear() + 10;
  let years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push({ value: year, label: year });
  }
  return years;
};

const years = getYears(2020);

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

  const user = useSelector((state) => state.user.user);
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);

  const formik = useFormik({
    initialValues: {
      payWay: "Visa",
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
      try {
        await dispatch(placeOrder(valuesWithUserId)).then(async (response) => {
          if (response.payload) {
            for (const item of cart.products) {
              await dispatch(removeFromCart(item.product._id))
                .unwrap()
                .then(() => {
                  if (
                    wishList?.products?.some(
                      (el) => el._id === item.product._id
                    )
                  ) {
                    dispatch(removeFromWishList(item.product._id)).unwrap();
                  }
                });
            }
          }
        });
        window.location.href = "/products/library";
      } catch (error) {
        console.error("Failed to place order and update cart/wishlist:", error);
      }
    },
  });

  const handleCancel = () => {
    navigate("/cart");
  };

  return (
    <>
      <FormContainer>
        <Title variant="h4">PAYMENT METHOD</Title>

        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <StyledInput
              select
              id="payway"
              name="payWay"
              autoComplete="on"
              label="Choose a payment method"
              value={formik.values.payWay}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.payWay && Boolean(formik.errors.payWay)}
              helperText={formik.touched.payWay && formik.errors.payWay}
              sx={{ width: "360px" }}
            >
              {paySystem.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledInput>
            <Box sx={{ display: "flex", gap: "15px" }}>
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
                  formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
                }
                helperText={
                  formik.touched.cardNumber && formik.errors.cardNumber
                }
                sx={{ width: "360px" }}
              />

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
                sx={{ width: "120px", marginLeft: "110px" }}
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
                  formik.touched.yearOfDate && Boolean(formik.errors.yearOfDate)
                }
                helperText={
                  formik.touched.yearOfDate && formik.errors.yearOfDate
                }
                sx={{ width: "120px" }}
              >
                {years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledInput>

              <StyledInput
                id="cvvCode"
                label="CVV code"
                placeholder="XXX"
                value={formik.values.cvvCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cvvCode && Boolean(formik.errors.cvvCode)}
                helperText={formik.touched.cvvCode && formik.errors.cvvCode}
                sx={{ width: "120px" }}
              />
            </Box>
          </InputGroup>

          <Title variant="h6" sx={{ marginTop: "25px" }}>
            BILLING INFORMATION
          </Title>
          <InputGroup
            sx={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                width: "min-content",
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
                sx={{ width: "175px" }}
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
                sx={{ width: "175px" }}
              />
              <MaskedInput
                id="phone"
                label="Phone number"
                autoComplete="on"
                mask="+999 999-999-99"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                sx={{ width: "360px" }}
              />

              <StyledInput
                id="adress"
                label="Billing address"
                value={formik.values.adress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.adress && Boolean(formik.errors.adress)}
                helperText={formik.touched.adress && formik.errors.adress}
                sx={{ width: "360px" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                width: "min-content",
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
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                sx={{ width: "390px" }}
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
                sx={{ width: "390px" }}
              />

              <StyledInput
                id="postIndex"
                label="Zip code"
                value={formik.values.postIndex}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.postIndex && Boolean(formik.errors.postIndex)
                }
                helperText={formik.touched.postIndex && formik.errors.postIndex}
                sx={{ width: "390px" }}
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
              variant="contained"
              color="primary"
            >
              Cancel
            </SubmitButton>
            <SubmitButton type="submit" variant="contained" color="primary">
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
          display: "flex",
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
    </>
  );
}
