import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/sliders/styles";
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
} from "@mui/material";
import { useEffect, useState } from "react";
import PriceBox from "../PriceBox/PriceBox";

export default function SearchItem({ product, hoveredItem, handleMouseEnter }) {
  const classes = useStyles();
  const {
    _id,
    name,
    imageUrls,
    genres,
    currentPrice,
    description,
    previousPrice,
  } = product;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [imageUrls]);

  return (
    <Link
      className="post__more"
      to={`/product/${_id}`}
      style={{ position: "relative" }}
    >
      {/* <Card
        onMouseEnter={() => handleMouseEnter(product._id)}
        onMouseLeave={() => handleMouseEnter("")}
        sx={{
          boxShadow: 5,
          borderRadius: 2,
          margin: "0",
          marginBottom: "15px",
          display: "flex",
          backgroundColor:
            hoveredItem === product._id ? "#bdbdbd" : "transparent",
        }}
      >
        <CardMedia
          sx={{ height: "auto", width: "300px", objectFit: "cover" }}
          image={imageUrls[0]}
          title={name}
        />
        <CardContent
          sx={{
            width: "100%",
            minHeight: 83,
            padding: "5px 16px",
            position: "relative",
            "&:last-child": { pb: 0 },
          }}
        >
          <Typography
            sx={{ textTransform: "capitalize" }}
            variant="h5"
            component="h5"
          >
            {name}
          </Typography>
          <List
            sx={{
              display: "flex",
              maxWidth: "50%",
              bgcolor: "background.paper",
              flexDirection: "row",
              justifyContent: "flex-start",
              columnGap: "15px",
              overflow: "hidden",
              backgroundColor:
                hoveredItem === product._id ? "#bdbdbd" : "transparent",
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
                    backgroundColor:
                      hoveredItem === product._id ? "transparent" : "",
                    border:
                      hoveredItem === product._id
                        ? "1px solid #000"
                        : "1px solid transparent ",
                  }}
                  primary={value.name}
                />
              </ListItem>
            ))}
          </List>

          <PriceBox
            previousPrice={previousPrice}
            currentPrice={currentPrice}
            showButton={false}
            position="absolute"
            additionalStyles={{
              display: "flex",
              gap: "11px",
              alignItems: previousPrice ? "flex-end" : "center",
              backgroundColor: "transperent",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 3px 2px 10px",
              position: "absolute",
              right: "16px",
              top: "25px",
              height: "35px",
            }}
          />
        </CardContent>
      </Card> */}
      <Card
        onMouseEnter={() => handleMouseEnter(product._id)}
        onMouseLeave={() => handleMouseEnter("")}
        sx={{
          boxShadow: 5,
          borderRadius: 2,
          margin: "0",
          marginBottom: "15px",
          display: "flex",
          backgroundColor: {xs: "var(--card-background-color)",
            md: hoveredItem === product._id ?  "var(--header-background-color)" : "var(--card-background-color)",
          },
        }}
      >
        <CardMedia
          sx={{
            height: "auto",
            width: { xs: "75px", md: "300px" },
            minWidth: "75px",
            objectFit: "cover",
          }}
          image={imageUrls[0]}
          title={name}
        />
        <CardContent
          sx={{
            width: "100%",
            minHeight: { md: 83 },
            padding: "5px 16px",
            position: "relative",
            "&:last-child": { pb: 0 },
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: "4.5vw ", md: "24px" },
              width: { xs: "70%" },
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              color: "var(--text-color)",
            }}
            variant="h5"
            component="h5"
          >
            {name}
          </Typography>
          <List
            sx={{
              display: "flex",
              maxWidth: { xs: "120px", md: "50%" },
              flexDirection: "row",
              justifyContent: "flex-start",
              columnGap: "15px",
              overflow: "hidden",
              // backgroundColor: {
              //   md: hoveredItem === product._id ? "var(--header-background-color)" : "transparent",
              // },
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
                    backgroundColor: {
                      md: hoveredItem === product._id ? "transparent" : "",
                    },
                    border: {
                      md:
                        hoveredItem === product._id
                          ? "1px solid #000"
                          : "1px solid transparent ",
                    },
                  }}
                  primaryTypographyProps={{
                    fontSize: { xs: "3vw", md: "16px" },
                  }}
                  primary={value.name}
                />
              </ListItem>
            ))}
          </List>
          <PriceBox
            previousPrice={previousPrice}
            currentPrice={currentPrice}
            showButton={false}
            productItem={true}
            position="absolute"
            discountFontSize={{ xs: "16px", md: "24px" }}
            currentPriceStylesFontSizeXs={{ xs: "14px", md: "16px" }}
            previousPriceFontSizeMd={{ xs: "10px", md: "12px" }}
            additionalStyles={{
              display: "flex",
              gap: "11px",
              alignItems: previousPrice ? "flex-end" : "center",
              backgroundColor: "transperent",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 3px 2px 10px",
              position: "absolute",
              right: "16px",
              top: { xs: "50%", md: "25px" },
              transform: { xs: "translateY(-45%)", md: "none" },
              height: { xs: "30px", md: "35px" },
            }}
          />
        </CardContent>
      </Card>
      <Collapse
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          right: "-49.5%",
          top: "-25%",
          width: "42%",
          backdropFilter: "blur(14px) saturate(181%)",
          backgroundColor: " rgba(0, 0, 0, 0.29)",
          borderRadius: "0 0 12px 12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
          color: "var(--text-color)",
          opacity: 1,
          zIndex: 5,
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 6px 9px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 11px 20px 5px",
        }}
        in={hoveredItem == product._id}
        timeout="auto"
      >
        <List sx={{ padding: 0 }}>
          <ImageListItem
            key={imageUrls[currentImageIndex]}
            sx={{
              padding: "0 0 5px",
              transition: "all 2.2s",
            }}
          >
            <img
              srcSet={imageUrls[currentImageIndex]}
              src={imageUrls[currentImageIndex]}
              alt={imageUrls[currentImageIndex]}
              loading="lazy"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                opacity: "1",
              }}
            />
          </ImageListItem>
        </List>
        <Typography
          sx={{
            padding: "5px 15px ",
            textTransform: "capitalize",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          variant="h5"
          component="h5"
        >
          {name}
        </Typography>
        <Typography
          sx={{
            padding: "0 15px",
            marginBottom: "5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: "100px",
          }}
          variant="p"
          component="p"
        >
          {description}
        </Typography>
      </Collapse>
    </Link>
  );
}

SearchItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
  // hoveredItem: PropTypes.string,
  // handleMouseEnter: PropTypes.func.isRequired,
};
