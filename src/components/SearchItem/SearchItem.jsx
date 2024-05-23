import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/styles";
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
  const percent = previousPrice
    ? Math.floor((currentPrice * 100) / previousPrice - 100)
    : null;
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
      <Card
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
          {previousPrice ? (
            <Box
              sx={{
                display: "flex",
                alignItems: previousPrice ? "flex-end" : "center",
                // backgroundColor: "#cccc",
                justifyContent: "space-between",
                padding: "3px 3px 3px 10px",
                borderRadius: "3px",
                gap: "10px",
                position: "absolute",
                right: "16px",
                top: "50%",
                height: "35px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  lineHeight: "1",
                  backgroundColor: "#4c6b22",
                  padding: "8.25px 3px",
                  color: "#BDED11",
                  position: "absolute",
                  top: "0px",
                  right: "96%",
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
                  left: "34.5%",
                  fontSize: "12px",
                  bottom: "19px",
                  color: "#647984",
                  textDecorationLine: "line-through",
                }}
                variant="p"
                component="p"
              >
                {previousPrice}$
              </Typography>
              <Typography
                sx={{
                  color: "#4c6b22",
                }}
                variant="p"
                component="p"
              >
                {currentPrice}$
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                // backgroundColor: "#cccc",
                padding: "4px 5px",
                borderRadius: "3px",
                position: "absolute",
                right: "16px",
                top: "58%",
              }}
            >
              <Typography variant="p" component="p">
                {currentPrice}$
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
      <Collapse
        sx={{
          position: "absolute",
          right: "-43.5%",
          top: "-25%",
          width: "41%",
          backdropFilter: "blur(14px) saturate(181%)",
          backgroundColor: " rgba(0, 0, 0, 0.29)",
          borderRadius: "0 0 12px 12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
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
