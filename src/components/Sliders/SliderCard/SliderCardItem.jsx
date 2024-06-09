import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../../styles/sliders/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PriceBox from "../../PriceBox/PriceBox";

export default function SliderCardItem({ product }) {
  const { _id, name, imageUrls, genres, currentPrice, previousPrice } = product;
  const classes = useStyles();

  return (
    <Card
      sx={{
        maxWidth: "calc(100% - 20px)",
        width: 385,
        boxShadow: 10,
        borderRadius: 2,
        margin: { xs: "8px auto 23px", md: "20px 20.8px" },
      }}
    >
      <Link className="post__more" to={`/product/${_id}`}>
        <CardMedia
          sx={{ height: { xs: 200, md: 300 } }}
          image={imageUrls[0]}
          title={name}
        />
        <CardContent
          sx={{
            minHeight: 83,
            padding: "5px 16px",
            position: "relative",
            "&:last-child": { pb: 0 },
          }}
        >
          <Typography
            sx={{ textTransform: "capitalize" }}
            variant="h4"
            component="h4"
          >
            {name}
          </Typography>
          <List
            sx={{
              display: "flex",
              width: "100%",
              bgcolor: "background.paper",
              flexDirection: "row",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              columnGap: "15px",
            }}
          >
            {genres.slice(0, 3).map((value) => (
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
            sliderItem={true}
            position="absolute"
            additionalStyles={{
              display: "flex",
              gap: "11px",
              alignItems: "baseline",
              position: "relative",
              mb: "10px",
              padding: "0 4px 0 0",
              backgroundColor: "#cccc",
              width: "fit-content",
              borderRadius: "4px",
            }}
          />
        </CardContent>
      </Link>
    </Card>
  );
}

SliderCardItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
};
