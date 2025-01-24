import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ImageListItem,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useStyles } from "../../styles/sliders/styles";
import PriceBox from "../PriceBox/PriceBox";

export default function CategoryItem({
  product,
  hoveredItem,
  handleMouseEnter,
  rank,
  currentCategory,
}) {
  const {
    _id,
    name,
    imageUrls,
    currentPrice,
    previousPrice,
    genres,
    currentPlayers,
    weeksInTopChart,
    yearOfPublication,
  } = product;
  const classes = useStyles();

  const productYear = new Date(yearOfPublication).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const updateImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };
    const timeoutId = setTimeout(updateImage, 3000);
    return () => clearTimeout(timeoutId);
  }, [currentImageIndex, imageUrls.length]);
  
  return (
    <Link className="post__more" to={`/product/${_id}`}>
      <Card
        onMouseEnter={() => handleMouseEnter(product._id)}
        onMouseLeave={() => handleMouseEnter("")}
        sx={{
          boxShadow: 5,
          margin: "5px 0",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "visible",
          color: "var(--text-color)",
          backgroundColor: "var(--card-background-color)", 
          "&:hover": {
            backgroundColor: "var(--header-background-color)",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "800",
            margin: {
              xs: rank >= 10 ? "0 4px" : "0 10px",
              md: rank >= 10 ? "0 9px" : "0 20px",
            },
            fontSize: { xs: "20px", md: "34px" },
          }}
          variant="h4"
          component="h4"
        >
          {rank}
        </Typography>
        <CardMedia
          sx={{
            borderRadius: "5px",
            height: { xs: "45px", md: "70px" },
            width: { xs: "135px", md: "250px" },
            objectFit: "cover",
            margin: "7px 0",
          }}
          image={imageUrls[0]}
          title={name}
        />
        <CardContent
          sx={{
            width: "calc(100% - 135px)",
            padding: { xs: "5px 6px", md: "5px 16px" },
            position: "relative",
            "&:last-child": { pb: 0 },
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: "12px", md: "24px" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: { xs: "87px", md: "487px" },
            }}
            variant="h5"
            component="h5"
          >
            {name}
          </Typography>

          <PriceBox
            previousPrice={previousPrice}
            currentPrice={currentPrice}
            showButton={false}
            categoryItem={true}
            position="absolute"
            discountFontSize={{ xs: "10px", md: "28px" }}
            currentPriceStylesFontSizeXs={{ xs: "9px", md: "16px" }}
            previousPriceFontSizeMd={{ xs: "6px", md: "12px" }}
            additionalStyles={{
              display: "flex",
              alignItems: previousPrice ? "flex-end" : "center",
              backgroundColor: previousPrice ? "var(--genre-color)" : "transparent",
              justifyContent: "space-between",
              padding: { xs: "0px 4px 2px", md: "3px 3px 3px 10px" },
              borderRadius: "0 3px 3px 0",
              gap: "10px",
              position: "absolute",
              right: { xs: "70px", md: "37.5%" },
              top: { xs: "2px", md: "0" },
              height: { xs: "20.5px", md: "35px" },
            }}
          />

          <Box
            sx={{
              display: "flex",
              padding: "4px 5px",
              borderRadius: "3px",
              position: "absolute",
              right: { xs: "4px", md: "16px" },
              top: "10%",
            }}
          >
            <Typography
              variant="p"
              component="p"
              sx={{ fontSize: { xs: "10px", md: "14px" } }}
            >
              {currentCategory === "Players"
                ? currentPlayers?.toLocaleString()
                : currentCategory === "Weeks"
                ? weeksInTopChart
                : productYear}
            </Typography>
          </Box>
        </CardContent>
        <Collapse
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            right: "0%",
            top: "0%",
            width: "31%",
            backdropFilter: "blur(14px) saturate(181%)",
            backgroundColor: "rgba(0, 0, 0, 0.29)",
            borderRadius: "0 0 12px 12px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
            opacity: 1,
            zIndex: 5,
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 6px 9px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 11px 20px 5px",
          }}
          in={hoveredItem === product._id}
          timeout="auto"
        >
          <List sx={{ padding: 0 }}>
            <ImageListItem key={imageUrls[currentImageIndex]}>
              <img
                srcSet={imageUrls[currentImageIndex]}
                src={imageUrls[currentImageIndex]}
                alt={imageUrls[currentImageIndex]}
                style={{
                  width: "100%",
                  height: "176px",
                  objectFit: "cover",
                  opacity: "1",
                  transition: "all 0.5s ease-out",
                }}
              />
            </ImageListItem>
          </List>
          <Typography
            sx={{
              padding: "10px 15px 0",
              textTransform: "capitalize",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            variant="h5"
            component="h5"
          >
            {name}
          </Typography>
          <List
            sx={{
              display: "flex",
              maxWidth: "70%",
              padding: "5px 0",
              marginLeft: "15px",
              justifyContent: "flex-start",
              columnGap: "15px",
              overflow: "hidden",
              backgroundColor: "transparent",
              mb: "5px",
            }}
          >
            {genres.map((value) => (
              <ListItem
                sx={{
                  width: "auto",
                  padding: "0",
                  textTransform: "capitalize",
                }}
                key={value._id}
                disableGutters
              >
                <ListItemText
                  className={classes.genreItem}
                  sx={{
                    margin: "0",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    backgroundColor: "transparent",
                  }}
                  primary={value.name}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Card>
    </Link>
  );
}

CategoryItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
  hoveredItem: PropTypes.string,
  handleMouseEnter: PropTypes.func.isRequired,
};
