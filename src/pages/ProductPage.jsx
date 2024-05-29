import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductId } from "../redux/productItem.slice/productItem.slice";
import { useStyles } from "../styles/styles";
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

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const { product, status } = useSelector((state) => state.product);
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const { library } = useSelector((state) => state.orders);

  const [onWishList, setOnWishList] = useState(false);
  const [onCart, setOnCart] = useState(false);
  const [onLibrary, setOnLibrary] = useState(false);
  const [value, setValue] = useState("1");

  const loggedIn = localStorage.getItem("loggedIn");
  const percent = product.previousPrice
    ? Math.floor((product.currentPrice * 100) / product.previousPrice - 100)
    : null;
  const productYear = new Date(product.yearOfPublication).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  useEffect(() => {
    dispatch(fetchProductId(id));
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
      dispatch(removeFromWishList(id));
      setOnWishList(false);
    } else {
      dispatch(addToWishList(id));
    }
  };

  const handleCartList = (id) => {
    if (onCart) {
      dispatch(removeFromCart(id));
      setOnCart(false);
    } else {
      dispatch(addToCart(id));
    }
  };

  const handleLibrary = () => {
    navigate("/products/library");
  };

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: "40px 0",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "50px",
          height: "auto",
          "@media (max-width: 960px)": {
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "25px",
          },
        }}
      >
        <Box
          component="div"
          sx={{
            position: "relative",
            width: "60%",
            "@media (max-width: 960px)": {
              width: "100%",
            },
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
            width: "100%",
            "@media (max-width: 600px)": { alignItems: "center" },
          }}
        >
          <Box
            component="img"
            sx={{
              height: "140px",
              width: "auto",
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
              "@media (max-width: 600px)": { fontSize: "22px" },
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
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflowX: "auto",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingBottom: "10px",
                    gap: "10px",
                    "@media (max-width: 600px)": { fontSize: "10px" },
                  }}
                >
                  {product?.genres?.map((value) => (
                    <Button
                      key={value._id}
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
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: `${
                loggedIn === "true" && !onLibrary ? "space-between" : "flex-end"
              }`,
              gap: "25px",
              marginTop: `${loggedIn === "true" ? "20px" : "35px"}`,
              alignItems: "center",
              position: "relative",
            }}
          >
            {loggedIn === "true" ? (
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
                }}
                variant="p"
                component="p"
              >
                Login to add this item to your wishlist, or add to cart
              </Typography>
            )}
            {loggedIn === "true" && onLibrary ? (
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
                <Box
                  sx={{
                    display: product.currentPrice === 0 ? "none" : "flex",
                    alignItems: product.previousPrice ? "flex-end" : "center",
                    backgroundColor: "#cccc",
                    justifyContent: "space-between",
                    padding: "3px 3px 3px 10px",
                    borderRadius: "3px",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  {product.previousPrice ? (
                    <>
                      <Typography
                        sx={{
                          fontSize: "24px",
                          lineHeight: "1",
                          backgroundColor: "#4c6b22",
                          padding: "8.25px 3px",
                          color: "#BDED11",
                          position: "absolute",
                          top: "0px",
                          left: "-62px",
                          borderRadius: "4px 0 0 4px",
                        }}
                        variant="p"
                        component="p"
                      >
                        {percent}%
                      </Typography>
                      <Typography
                        sx={{
                          position: "absolute",
                          left: "11.5%",
                          fontSize: "12px",
                          bottom: "19px",
                          color: "#647984",
                          textDecorationLine: "line-through",
                        }}
                        variant="p"
                        component="p"
                      >
                        {product.previousPrice}$
                      </Typography>
                      <Typography
                        sx={{
                          color: "#4c6b22",
                        }}
                        variant="p"
                        component="p"
                      >
                        {product.currentPrice}$
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="p" component="p">
                      {product.currentPrice}$
                    </Typography>
                  )}
                  <Button
                    disabled={loggedIn !== "true"}
                    onClick={() => handleCartList(id)}
                    sx={{
                      padding: "5px 12px  ",
                      textTransform: "initial",
                      backgroundColor: "#bdbdbd",
                      borderRadius: "3px",
                    }}
                  >
                    {onCart ? "In cart" : "Add to cart"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box component="div" sx={{ marginTop: "110px" }}>
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
                  fontSize: "16px",
                  textTransform: "uppercase",
                },
                "& button:hover": {
                  backgroundColor: "#c4c4c4",
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
              // backgroundImage: `url(${
              //   product?.imageUrls ? product.imageUrls[2] : ""
              // })`,
              // backgroundRepeat: "no-repeat",
              // backgroundSize: "cover",
              // backgroundPosition: "center center",
              backgroundColor: "#cccc",
              opacity: 0.8,
              backgroundImage:
                "repeating-radial-gradient( circle at 0 0, transparent 0, #cccc 100px ), repeating-linear-gradient( #00000055, #000000 )",
            }}
          >
            <Typography
              variant="p"
              sx={{
                width: "75%",
                margin: "0 auto",
                color: "#000",
                backdropFilter: "blur(10px) saturate(99%)",
                backgroundColor: "rgba(255, 255, 255, 0.29)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                padding: "20px",
                fontSize: "22px",
                "@media (max-width: 600px)": { fontSize: "18px" },
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
              height: "auto",
              width: "auto",
              gap: "50px",
              alignItems: "center",
              // backgroundImage: `url(${
              //   product?.imageUrls ? product.imageUrls[0] : ""
              // })`,
              // backgroundRepeat: "no-repeat",
              // backgroundSize: "cover",
              // backgroundPosition: "center center",
              backgroundColor: "#cccc",
              opacity: 0.8,
              backgroundImage:
                "repeating-radial-gradient( circle at 0 0, transparent 0, #cccc 100px ), repeating-linear-gradient( #00000055, #000000 )",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                backdropFilter: "blur(10px) saturate(99%)",
                backgroundColor: "rgba(255, 255, 255, 0.29)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                padding: "20px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "700",
                  "@media (max-width: 600px)": {
                    fontSize: "18px",
                    textWrap: "nowrap",
                    overflow: "hidden",
                  },
                }}
              >
                MINIMUM:
              </Typography>
              {product?.requirementsMin?.map((item, index) => (
                <Typography
                  key={index}
                  variant="p"
                  sx={{
                    fontSize: "20px",
                    "@media (max-width: 600px)": {
                      fontSize: "18px",
                      textWrap: "nowrap",
                      overflow: "hidden",
                    },
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
                width: "50%",
                backdropFilter: "blur(10px) saturate(99%)",
                backgroundColor: "rgba(255, 255, 255, 0.29)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                padding: "20px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "700",
                  "@media (max-width: 600px)": { fontSize: "18px" },
                }}
              >
                RECOMMENDED:
              </Typography>
              {product?.requirementsRec?.map((item, index) => (
                <Typography
                  key={index}
                  variant="p"
                  sx={{
                    fontSize: "20px",
                    "@media (max-width: 600px)": { fontSize: "18px" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
