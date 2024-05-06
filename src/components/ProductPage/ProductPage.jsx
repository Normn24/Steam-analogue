import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductId } from "../../redux/productItem.slice/productItem.slice";
import styles from "./styles.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography
} from "@mui/material";
import { Rating } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import ProductPageSlider from "../Sliders/ProductPageSlider/ProductPageSlider";


export default function ProductPage(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.product);

  const [favorite, setFavorite] = useState(false);
  const handleFavorite = () => setFavorite(!favorite);
  const [orientation, setOrientation] = useState('horizontal');
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /*----      Орієнтація вкладок Tab       ----*/

  console.log(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setOrientation('vertical');
      } else {
        setOrientation('horizontal');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  useEffect(() => {
    dispatch(fetchProductId(id));
  }, [dispatch, id]);

  if (status == "loading") {
    return <div className={styles.productContainer}>Loading...</div>;
  }

  /*----     Форматування дати         ----*/

  const dateString = new Date(product.date)
  const productYear = dateString.getFullYear();


  

  /*const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };*/

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: "20px 0",
        gap: "20px",
        fontFamily: '"Gill Sans", sans-serif',
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "50px",
          '@media (max-width: 960px)': {
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: '55px'
          }
        }}
      >
        <Box
          component="div"
          sx={{
            marginTop: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "center",
            position: "relative",
            width: "60%",
            '@media (max-width: 960px)': {
              width: '100%'
            }
          }}
        >
          {product.previousPrice && <Button
            variant="contained"
            disableElevation
            sx={{ position: "absolute", width: "30%", borderRadius: "0" }}
          >
            Sale
          </Button>}

          {/* <img
            src={product.imageUrls ? product.imageUrls[0] : ""}
            alt={product.name}
            className={styles.productImg}
          /> */}
          <ProductPageSlider  product={product?.imageUrls} />



          
        </Box>
        <Box component="div" sx={{display: 'flex', flexDirection: 'column', '@media (max-width: 600px)': {alignItems: 'center'}}}>
          <Typography variant="h2" sx={{'&::first-letter': {textTransform: 'uppercase'}, fontSize: '32px', marginBottom: '10px', '@media (max-width: 600px)': {fontSize: '22px'}}}>{product.name}</Typography>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            {!favorite && (
              <AiOutlineHeart
                onClick={handleFavorite}
                style={{
                  height: "25px",
                  width: "auto",
                  color: "#828386",
                  cursor: "pointer",
                  '&:hover': {transform: 'scale(1.2)'}
                }}
              />
            )}
            {favorite && (
              <AiFillHeart
                onClick={handleFavorite}
                style={{
                  height: "25px",
                  width: "auto",
                  color: "#1565C0",
                  cursor: "pointer",
                  '&:hover': {transform: 'scale(1.2)'}
                }}
              />
            )}
            <Box
              component="div"
              sx={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <Rating
                name="half-rating"
                defaultValue={(product.rating / 100) * 5}
                precision={0.1}
              />
              <span>{product.rating} / 100</span>
            </Box>
          </Box>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ minWidth: "150px", '@media (max-width: 960px)': {minWidthidth: '100px'}}}>Дата виходу</TableCell>
                <TableCell>{productYear}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Розробник</TableCell>
                <TableCell>{product.developer}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Видавець</TableCell>
                <TableCell>{product.publisher}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Жанр</TableCell>
                <TableCell sx={{display: 'flex', width: "150px", flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" , overflowX: "scroll", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", '@media (max-width: 600px)': {fontSize: '10px'}}}>
                  {product?.genres?.map((value, index) => <Typography key={index} sx={{margin: '0 3px 3px 0', padding: '4px 7px', backgroundColor: 'lightblue', borderRadius: '3px'}}>{value.name}</Typography>)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '25px'}}>
            {product.previousPrice && <Typography variant="h4" sx={{fontSize: '26px', marginTop: "20px", textDecoration: 'line-through', color: 'grey', '@media (max-width: 600px)': {fontSize: '18px'}}}>{product.previousPrice} ₴</Typography>}
            <Typography variant="h4" sx={{fontSize: '24px', marginTop: "20px", '@media (max-width: 600px)': {fontSize: '18px'}}}>{product.currentPrice} ₴</Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ marginTop: "20px", fontSize: "18px", width: "30%" }}
          >
            Купити
          </Button>
        </Box>
      </Box>
      <Box component="div" sx={{marginTop: "60px"}}>
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
              orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
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
    </Container>
  );
};

