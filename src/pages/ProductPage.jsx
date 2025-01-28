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
  Button,
  Typography,
} from "@mui/material";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { TabContext } from "@mui/lab";
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

import PriceBox from "../components/PriceBox/PriceBox.jsx";
import { TableCellStyle, TabPanelContentStyle, TabPanelStyle } from "../styles/pagesStyle/ProductPage.js";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const { product } = useSelector((state) => state.product);
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const { library } = useSelector((state) => state.orders);
  const token = useSelector((state) => state.login.token);
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
        dispatch(addComment({ values,  }));
        resetForm();
      },
      [dispatch, ]
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
      dispatch(removeFromWishList({ id,  }));
      setOnWishList(false);
    } else {
      dispatch(addToWishList({ id,  }));
    }
  };

  const handleCartList = (id) => {
    if (onCart) {
      dispatch(removeFromCart({ id,  }));
      setOnCart(false);
    } else {
      dispatch(addToCart({ id,  }));
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
            <Box
              sx={{
                position: "absolute",
                width: "30%",
                borderRadius: "6px 0 0 0 ",
                zIndex: 10,
                backgroundColor: "var(--header-background-color)",
                textAlign: "center",
                color: "var(--text-color)", 
                fontSize: "24px",
                textTransform: "uppercase", 
                border: "1px solid",
              }}
            >
              Sale
            </Box>
          )}

          <ProductPageSlider product={product?.imageUrls} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "calc(40% - 50px)" },
          }}
        >
          <Box
            component="img"
            sx={{
              display: { xs: "none", md: "block" },
              height: "140px",
              width: "100%",
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
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Typography>
          <Table sx={{ width: "100%"}}>
            <TableBody>
              <TableRow>
                <TableCellStyle>Release</TableCellStyle>
                <TableCellStyle>{productYear}</TableCellStyle>
              </TableRow>
              <TableRow>
                <TableCellStyle>Developer</TableCellStyle>
                <TableCellStyle>{product.developer}</TableCellStyle>
              </TableRow>
              <TableRow>
                <TableCellStyle>Publisher</TableCellStyle>
                <TableCellStyle>{product.publisher}</TableCellStyle>
              </TableRow>
              <TableRow>
                <TableCellStyle>Genres</TableCellStyle>
                <TableCellStyle
                  sx={{
                    paddingBottom: "10px",
                    position: "relative",
                    height: { xs: "50px", md: "60px" }
                  }}
                >
                  <Box  sx={{
                    position: "absolute",
                    left: "16px",
                    top: "20px",
                    width: "calc(100% - 16px)",
                    display: "flex",
                    gap: "10px",
                    paddingBottom: "10px",
                    overflowX: "auto",
                  }}>
                  {product?.genres?.map((value) => (
                    <NavLink
                      to={`/products/search/?genre=${value._id}`}
                      key={value._id}
                    >
                      <Button
                        className={classes.genreItem}
                        sx={{
                          margin: "0",
                          textTransform: "capitalize",
                          background: "var(--genre-color)",
                          color: "var(--text-color)",
                          whiteSpace: "nowrap",
                          "&:hover": {
                            background: "var(--genre-color)",
                          },
                        }}
                      >
                        {value.name}
                      </Button>
                    </NavLink>
                  ))}
                  </Box>
                </TableCellStyle>
              </TableRow>
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: `${
                token && !onLibrary ? "space-between" : "flex-end"
              }`,
              gap: "25px",
              marginTop: `${token ? "20px" : "35px"}`,
              alignItems: { xs: "flex-end", md: "center" },
              position: "relative",
              flexDirection: { xs: "column-reverse", md: "row" },
              width: "100%",
            }}
          >
            {token ? (
              <Button
                sx={{
                  display: onLibrary ? "none" : "flex",
                  fontSize: "12px",
                  width: "auto",
                  backgroundColor: onWishList ? "var(--header-background-color)" : "var(--genre-color)",
                  borderRadius: "3px",
                  padding: "9.75px 12px",
                  ":hover": {
                    backgroundColor: onWishList ? "var(--genre-color)" : "var(--header-background-color)",
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
            {token && onLibrary ? (
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
                    token={token}
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
          backgroundColor: "var(--card-background-color)",
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
              disabled={false}
              minRows={4}
              maxRows={8}
              variant="plain"
              value={formik.values.content}
              onChange={formik.handleChange}
              sx={{
                width: '100%',
                backgroundColor: "var(--header-background-color)",
                color: "var(--text-color) !important",
                borderColor: "var(--header-background-color) !important",
              }}
            />
          </InputGroup>
          <Button
            sx={{
              mt: "17px",
              fontSize: "12px",
              width: "auto",
              backgroundColor: "var(--genre-color)",
              borderRadius: "3px",
              padding: "9.75px 25px",
              float: "right",
              ":hover": {
                backgroundColor: "var(--header-background-color)",
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
          marginTop: product.category !== "6632424ed9075d19584c508d" ? onLibrary ? "40px" : "100px" : "140px",
          boxShadow: "0px -3px 10px -4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "var(--header-background-color)",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              variant="fullWidth"
              TabIndicatorProps={{
                sx: { backgroundColor: "var(--header-tabs-hover-color)", color: "var(--text-color)" },
              }}
              aria-label="secondary tabs example"
              sx={{
                border: "none",
                "& button": {
                  fontSize: { xs: "13px", md: "16px" },
                  textTransform: "uppercase",
                  color: "var(--text-color)",
                },
                "& button:hover": {
                  backgroundColor: "var(--genre-color)",
                },
                "& button:active": { borderColor: "transparent", color: "var(--text-color)" },
                "& .Mui-selected": {
                  backgroundColor: "transparent",
                  color: "var(--text-color) !important", 
                },
              }}
            >
              <Tab value="1" label="ABOUT THIS GAME" />
              <Tab value="2" label="SYSTEM REQUIREMENTS" />
            </Tabs>
          </Box>
          <TabPanelStyle
            value="1"
            index={0}
            sx={{
              display: value == 1 ? "flex" : "none",
            }}
          >
            <TabPanelContentStyle
              variant="p"
              sx={{
                width: { xs: "90%", md: "75%" },
                margin: "0 auto 60px",
                fontSize: { xs: "14px", md: "22px" },
              }}
            >
              {product.description}
            </TabPanelContentStyle>
          </TabPanelStyle>
          <TabPanelStyle
            value="2"
            index={1}
            sx={{
              display: value == 2 ? "flex" : "none",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <TabPanelContentStyle
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "90%", md: "50%" },
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
            </TabPanelContentStyle>
            <TabPanelContentStyle
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "90%", md: "50%" },
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
            </TabPanelContentStyle>
          </TabPanelStyle>
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
