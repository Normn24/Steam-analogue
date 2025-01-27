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
import { memo } from "react";
import PriceBox from "../PriceBox/PriceBox";

const ProductItem = ({ product, hoveredItem, handleMouseEnter }) => {
  const { _id, name, imageUrls, genres, currentPrice, previousPrice } = product;

  const classes = useStyles();

  return (
    <Link className="post__more" to={`/product/${_id}`}>
      <Card
        onMouseEnter={() => handleMouseEnter(product._id)}
        sx={{
          width: { md: "70%" },
          position: "relative",
          boxShadow: 5,
          borderRadius: 2,
          margin: "10px 0",
          display: "flex",
          paddingRight: { md: hoveredItem === product._id ? "24px" : "0" },
          backgroundColor: {xs: "var(--card-background-color)",
            md: hoveredItem === product._id ? "var(--header-background-color)" : "var(--card-background-color)",
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
              width: { xs: "170px", md: "auto" },
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
                    border: "1px solid var(--card-background-color)",
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
          right: "20px",
          top: "20px",
          width: "28%",
          backgroundColor: "var(--header-background-color)",
          borderRadius: 2,
        }}
        in={hoveredItem == product._id}
        timeout="auto"
      >
        <Typography
          sx={{
            padding: "10px 15px 0",
            textTransform: "capitalize",
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
            maxWidth: "70%",
            padding: "5px 0",
            marginLeft: "15px",
            flexDirection: "row",
            justifyContent: "flex-start",
            columnGap: "15px",
            overflow: "hidden",
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
                  border: "1px solid var(--card-background-color)",
                }}
                primary={value.name}
              />
            </ListItem>
          ))}
        </List>
        <List sx={{ padding: 0 }}>
          {imageUrls.slice(1, 5).map((item) => (
            <ImageListItem key={item} sx={{ padding: "0 15px 11px" }}>
              <img
                srcSet={item}
                src={item}
                alt={item}
                loading="lazy"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
            </ImageListItem>
          ))}
        </List>
      </Collapse>
      {/* // </Link> */}
    </Link>
  );
};

ProductItem.propTypes = {
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

const MemoizedProductItem = memo(ProductItem);

MemoizedProductItem.displayName = "ProductItem";

export default MemoizedProductItem;
