import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductId } from "../../redux/productItem.slice/productItem.slice";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Modal from "../../components/Modal/Modal";
import { addToCart } from "../../redux/carts.slice/carts.slice";
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
import ProductPageSlider from "../../components/Sliders/ProductPageSlider/ProductPageSlider";
import {
  addToWishList,
  fetchWishList,
  removeFromWishList,
} from "../../redux/wishList.slice/wishList.slice";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.product);
  const { wishList } = useSelector((state) => state.wishList);
  const [toggleModal, setToggleModal] = useState(false);
  const [onWishList, setOnWishList] = useState(false);
  const [orientation, setOrientation] = useState("horizontal");
  const [value, setValue] = useState("1");

  useEffect(() => {
    if (wishList?.products?.some((item) => item._id === product._id)) {
      setOnWishList(true);
    } else {
      setOnWishList(false);
    }
  }, [wishList, product]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setOrientation("vertical");
      } else {
        setOrientation("horizontal");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProductId(id));
  }, [dispatch, id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleWishList = (_id) => {
    if (onWishList) {
      dispatch(removeFromWishList(_id)).then(() => {
        dispatch(fetchWishList());
      });
      setOnWishList(false);
    } else {
      dispatch(addToWishList(_id)).then(() => {
        dispatch(fetchWishList());
      });
      setOnWishList(false);
    }
  };

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  const productYear = new Date(product.yearOfPublication).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  /*const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };*/

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

          {/* <img
            src={product.imageUrls ? product.imageUrls[0] : ""}
            alt={product.name}
            className={styles.productImg}
          /> */}
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
            src={product.imageUrls ? product.imageUrls[0] : ""}
          />
          <Typography
            variant="h2"
            sx={{
              "&::first-letter": { textTransform: "uppercase" },
              fontSize: "32px",
              margin: "10px 0",
              "@media (max-width: 600px)": { fontSize: "22px" },
            }}
          >
            {product.name}
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Release date</TableCell>
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
                    "@media (max-width: 600px)": { fontSize: "10px" },
                  }}
                >
                  {product?.genres?.map((value, index) => (
                    <Typography
                      key={index}
                      sx={{
                        margin: "0 3px 0px 0",
                        padding: "4px 7px",
                        backgroundColor: "lightblue",
                        borderRadius: "3px",
                      }}
                    >
                      {value.name}
                    </Typography>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "25px",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                fontSize: "12px",
                width: "auto",
                backgroundColor: "#bdbdbd",
                borderRadius: "3px",
                padding: "5px 12px",
                ":hover": { backgroundColor: "#cccc" },
              }}
              startIcon={onWishList ? <MdBookmarkAdded /> : <MdBookmarkAdd />}
              onClick={() => handleWishList(product._id)}
            >
              {onWishList ? "In wishlist" : "Add to wishlist"}
            </Button>

            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                position: "relative",
              }}
            >
              {product.previousPrice && (
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "16px",
                    textDecoration: "line-through",
                    color: "grey",
                    position: "absolute",
                    top: "-13px",
                    left: "5%",
                    "@media (max-width: 600px)": { fontSize: "18px" },
                  }}
                >
                  {product.previousPrice}₴
                </Typography>
              )}
              <Typography
                variant="p"
                sx={{
                  fontSize: "20px",
                  "@media (max-width: 600px)": { fontSize: "18px" },
                }}
              >
                {product.currentPrice}₴
              </Typography>
              <Button
                onClick={() => {
                  setToggleModal(true);
                }}
                variant="contained"
                sx={{ fontSize: "12px", width: "auto" }}
              >
                Add to card
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box component="div" sx={{ marginTop: "100px" }}>
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
              orientation={
                orientation === "vertical" ? "vertical" : "horizontal"
              }
              TabIndicatorProps={{
                sx: { backgroundColor: "blue", color: "black" },
              }}
              aria-label="secondary tabs example"
              sx={{
                border: "none",
                "& button": {},
                "& button:hover": {
                  backgroundColor: "#c4c4c4",
                  fontWeight: 500,
                },
                "& button:active": { borderColor: "transparent" },
                "& button:Mui-selected": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Tab value="1" label="Опис" />
              <Tab value="2" label="Системні вимоги" />
            </Tabs>
          </Box>
          <TabPanel
            value="1"
            index={0}
            sx={{ textAlign: "left", fontSize: "18px" }}
          >
            {product.description}
          </TabPanel>
          <TabPanel value="2" index={1}>
            Tab Two
          </TabPanel>
        </TabContext>
      </Box>
      <div className="products-carousel"></div>
      {toggleModal && (
        <Modal modalClose={() => setToggleModal(false)} isModal={toggleModal}>
          <header className="modal__header">
            <h2>Замовлення</h2>
          </header>
          <div className="modal__content">
            <p>Ваш товар</p>
          </div>
          <footer className="modal__footer">
            <button
              onClick={() => {
                dispatch(addToCart(product));
                setToggleModal(false);
              }}
              className="modal__btn-success"
            >
              Додати
            </button>
            <button
              onClick={() => setToggleModal(false)}
              className="modal__btn-cancel"
            >
              Відмінити
            </button>
          </footer>
        </Modal>
      )}
    </Box>
  );
}
