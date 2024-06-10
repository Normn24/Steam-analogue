import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { fetchProductId } from "../redux/productItem.slice/productItem.slice";
import { useStyles } from "../styles/sliders/styles.js";
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@mui/material";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { TabContext, TabPanel } from "@mui/lab";
import ProductPageSlider from "../components/Sliders/ProductPageSlider/ProductPageSlider";
import {
  addToWishList,
  removeFromWishList,
} from "../redux/wishList.slice/wishList.slice";
import { removeFromCart, addToCart } from "../redux/cart.slice/cart.slice";
import Comments from "../components/Comments/Comments";
import {
  addComment,
  fetchProductComments,
} from "../redux/comments.slice/comments.slice";

import { useFormik } from "formik";
import { Form, InputGroup } from "../styles/forms/StylesAuthForm.js";

import Textarea from "@mui/joy/Textarea";
import useToken from "../hooks/useToken.js";
import PriceBox from "../components/PriceBox/PriceBox.jsx";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const token = useToken();

  const { product } = useSelector((state) => state.product);
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const { library } = useSelector((state) => state.orders);
  const loggedIn = useSelector((state) => state.login.loggedIn);

  const [onWishList, setOnWishList] = useState(false);
  const [onCart, setOnCart] = useState(false);
  const [onLibrary, setOnLibrary] = useState(false);
  const [value, setValue] = useState("1");

  const productYear = new Date(product.yearOfPublication).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formik = useFormik({
    initialValues: useMemo(
      () => ({
        product: id,
        content: "",
      }),
      [id]
    ),
    onSubmit: useCallback(
      (values, { resetForm }) => {
        dispatch(addComment({ values, token }));
        resetForm();
      },
      [dispatch, token]
    ),
  });

  useEffect(() => {
    dispatch(fetchProductId(id));
    dispatch(fetchProductComments(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (wishList?.products?.some((item) => item._id === product._id)) {
      setOnWishList(true);
    } else {
      setOnWishList(false);
    }
    if (cart?.products?.some((item) => item?.product?._id === product._id)) {
      setOnCart(true);
    } else {
      setOnCart(false);
    }
    if (
      library?.some((item) =>
        item?.some((element) => element?._id === product._id)
      )
    ) {
      setOnLibrary(true);
    } else {
      setOnLibrary(false);
    }
  }, [cart, product, wishList, library]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleWishList = (id) => {
    if (onWishList) {
      dispatch(removeFromWishList({ id, token }));
      setOnWishList(false);
    } else {
      dispatch(addToWishList({ id, token }));
    }
  };

  const handleCartList = (id) => {
    if (onCart) {
      dispatch(removeFromCart({ id, token }));
      setOnCart(false);
    } else {
      dispatch(addToCart({ id, token }));
    }
  };

  const handleLibrary = () => {
    navigate("/products/library");
  };

  return (
    <Box
      sx={{
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: "40px 20px",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          gap: { xs: "0", md: "50px" },
          height: "auto",
        }}
      >
        <Box
          component="div"
          sx={{
            position: "relative",
            width: { xs: "100%", md: "60%" },
          }}
        >
          {product.previousPrice && (
            <Button
              variant="contained"
              disableElevation
              sx={{
                position: "absolute",
                width: "30%",
                borderRadius: "6px 0 0 0 ",
                zIndex: 10,
              }}
            >
              Sale
            </Button>
          )}

          <ProductPageSlider product={product?.imageUrls} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            "@media (max-width: 600px)": { alignItems: "center" },
          }}
        >
          <Box
            component="img"
            sx={{
              display: { xs: "none", md: "block" },
              height: "140px",
              width: "446px",
              objectFit: "cover",
              borderRadius: "0px 6px 0px 0px",
            }}
            src={product?.imageUrls ? product?.imageUrls[0] : ""}
          />
          <Typography
            variant="h2"
            sx={{
              "&::first-letter": { textTransform: "uppercase" },
              fontSize: "32px",
              margin: "10px 0",
              fontWeight: 600,
            }}
          >
            {product.name}
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Release</TableCell>
                <TableCell>{productYear}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Developer</TableCell>
                <TableCell>{product.developer}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Publisher</TableCell>
                <TableCell>{product.publisher}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Genres</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    width: "auto",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflowX: "auto",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingBottom: "10px",
                    gap: "10px",
                  }}
                >
                  {product?.genres?.map((value) => (
                    <NavLink
                      to={`/products/search/?genre=${value._id}`}
                      key={value._id}
                    >
                      <Button
                        className={classes.genreItem}
                        sx={{
                          margin: "0",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          textTransform: "capitalize",
                          background: "#cccc",

                          color: "#000",
                          "&:hover": {
                            background: "#cccc",
                          },
                        }}
                      >
                        {value.name}
                      </Button>
                    </NavLink>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: `${
                loggedIn && !onLibrary ? "space-between" : "flex-end"
              }`,
              gap: "25px",
              marginTop: `${loggedIn ? "20px" : "35px"}`,
              alignItems: { xs: "flex-end", md: "center" },
              position: "relative",
              flexDirection: { xs: "column-reverse", md: "row" },
              width: "100%",
            }}
          >
            {loggedIn ? (
              <Button
                sx={{
                  display: onLibrary ? "none" : "flex",
                  fontSize: "12px",
                  width: "auto",
                  backgroundColor: onWishList ? "#bdbdbd" : "#cccc",
                  borderRadius: "3px",
                  padding: "9.75px 12px",
                  ":hover": {
                    backgroundColor: onWishList ? "#cccc" : "#bdbdbd",
                  },
                }}
                startIcon={onWishList ? <MdBookmarkAdded /> : <MdBookmarkAdd />}
                onClick={() => handleWishList(id)}
              >
                {onWishList ? "In wishlist" : "Add to wishlist"}
              </Button>
            ) : (
              <Typography
                sx={{
                  position: "absolute",
                  top: "-30px",
                  width: "100%",
                  textAlign: "center",
                  fontSize: { xs: "12px", md: "16px" },
                }}
                variant="p"
                component="p"
              >
                Login to add this item to your wishlist, or add to cart
              </Typography>
            )}
            {loggedIn && onLibrary ? (
              <>
                <Button
                  onClick={() => handleLibrary()}
                  sx={{
                    padding: "8px 12px",
                    textTransform: "initial",
                    backgroundColor: "#4c6b22",
                    color: "#BDED11",
                    borderRadius: "3px",
                    ":hover": {
                      backgroundColor: "#5e9f06",
                    },
                  }}
                >
                  Go to library
                </Button>
              </>
            ) : (
              <>
                {product.category !== "6632424ed9075d19584c508d" && (
                  <PriceBox
                    previousPrice={product.previousPrice}
                    currentPrice={product.currentPrice}
                    onCart={onCart}
                    handleCartList={handleCartList}
                    productId={product?._id}
                    loggedIn={loggedIn}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: { xs: "40px", md: "110px" },
          display: onLibrary ? "block" : "none",
          boxShadow: "0px 0px 10px -1px rgba(0, 0, 0, 0.2)",
          padding: "15px",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontSize: { xs: "16px", md: "24px" },
            }}
          >
            Write a review for{" "}
            <span style={{ textTransform: "capitalize" }}>{product.name}</span>
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{ opacity: "0.6", m: 0, fontSize: { xs: "11px", md: "16px" } }}
          >
            Please describe what you liked or disliked about this game and
            whether you recommend it to others.
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{ opacity: "0.6", m: 0, fontSize: { xs: "11px", md: "16px" } }}
          >
            Please remember to be polite and follow the Rules and Guidelines.
          </Typography>
        </Box>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Textarea
              id="content"
              name="content"
              color="neutral"
              disabled={false}
              minRows={4}
              maxRows={8}
              variant="soft"
              value={formik.values.content}
              onChange={formik.handleChange}
            />
          </InputGroup>
          <Button
            sx={{
              mt: "17px",
              fontSize: "12px",
              width: "auto",
              backgroundColor: "#cccc",
              borderRadius: "3px",
              padding: "9.75px 25px",
              float: "right",
              ":hover": {
                backgroundColor: "#bdbdbd",
              },
            }}
            type="submit"
            disabled={formik.values.content.trim() === ""}
          >
            Submit
          </Button>
        </Form>
      </Box>

      <Box
        component="div"
        sx={{
          marginTop: onLibrary ? "40px" : "100px",
          boxShadow: "0px -3px 10px -4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#fff",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              variant="fullWidth"
              TabIndicatorProps={{
                sx: { backgroundColor: "blue", color: "black" },
              }}
              aria-label="secondary tabs example"
              sx={{
                border: "none",
                "& button": {
                  fontSize: { xs: "13px", md: "16px" },

                  textTransform: "uppercase",
                },
                "& button:hover": {
                  backgroundColor: "#cccc",
                },
                "& button:active": { borderColor: "transparent" },
                "& button:Mui-selected": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Tab value="1" label="ABOUT THIS GAME" />
              <Tab value="2" label="SYSTEM REQUIREMENTS" />
            </Tabs>
          </Box>
          <TabPanel
            value="1"
            index={0}
            sx={{
              display: value == 1 ? "flex" : "none",
              textAlign: "left",
              fontSize: "28px",
              backgroundColor: "#b5b7ffcc",
              opacity: 0.8,
              backgroundAttachment: "fixed",

              backgroundImage:
                "repeating-radial-gradient( circle at 0 0, transparent 0, #cccc 100px ), repeating-linear-gradient( #00000055, #000000 )",
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                boxShadow: "inset 0px -800px 500px -490px #ffff",
              },
            }}
          >
            <Typography
              variant="p"
              sx={{
                width: { xs: "90%", md: "75%" },
                margin: "0 auto 60px",
                color: "#000",
                backdropFilter: "blur(10px) saturate(99%)",
                backgroundColor: "rgba(255, 255, 255, 0.29)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                padding: "20px",
                fontSize: { xs: "14px", md: "22px" },
              }}
            >
              {product.description}
            </Typography>
          </TabPanel>
          <TabPanel
            value="2"
            index={1}
            sx={{
              display: value == 2 ? "flex" : "none",
              flexDirection: { xs: "column", md: "row" },
              height: "auto",
              width: "auto",
              gap: "50px",
              alignItems: "center",
              backgroundColor: "#b5b7ffcc",
              opacity: 0.8,
              backgroundAttachment: "fixed",
              backgroundImage:
                "repeating-radial-gradient( circle at 0 0, transparent 0, #cccc 100px ), repeating-linear-gradient( #00000055, #000000 )",
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                boxShadow: "inset 0px -800px 600px -510px #ffff",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "90%", md: "50%" },
                backdropFilter: "blur(10px) saturate(99%)",
                backgroundColor: "rgba(255, 255, 255, 0.29)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                padding: "20px",
                marginBottom: { xs: "0", md: "60px" },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "16px", md: "24px" },
                }}
              >
                MINIMUM:
              </Typography>
              {product?.requirementsMin?.map((item, index) => (
                <Typography
                  key={index}
                  variant="p"
                  sx={{
                    fontSize: { xs: "14px", md: "20px" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "90%", md: "50%" },

                backdropFilter: "blur(10px) saturate(99%)",
                backgroundColor: "rgba(255, 255, 255, 0.29)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                padding: "20px",
                marginBottom: "60px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "16px", md: "24px" },
                }}
              >
                RECOMMENDED:
              </Typography>
              {product?.requirementsRec?.map((item, index) => (
                <Typography
                  key={index}
                  variant="p"
                  sx={{
                    fontSize: { xs: "14px", md: "20px" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontWeight: "700",
            marginBottom: "15px",
            textTransform: "uppercase",
            fontSize: { xs: "18px", md: "24px" },
          }}
        >
          CUSTOMER REVIEWS
        </Typography>

        <Comments />
      </Box>
    </Box>
  );
}
