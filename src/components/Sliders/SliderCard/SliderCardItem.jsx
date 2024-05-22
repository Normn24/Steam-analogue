import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../../styles/styles";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

export default function SliderCardItem({ product }) {
  const { _id, name, imageUrls, genres, currentPrice } = product;
  const classes = useStyles();
  const previousPrice = 520;

  const percent = Math.floor((currentPrice * 100) / previousPrice);

  return (
    <Card
      sx={{
        width: 385,
        boxShadow: 10,
        borderRadius: 2,
        margin: "20px 20.8px",
      }}
    >
      <Link className="post__more" to={`/product/${_id}`}>
        <CardMedia sx={{ height: 300 }} image={imageUrls[0]} title={name} />
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
              maxWidth: "70%",
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
          <Box
            sx={{
              display: "flex",
              gap: "11px",
              alignItems: "baseline",
              position: "relative",
              mb: "10px",
              paddingRight: "4px",
              backgroundColor: "#cccc",
              width: "fit-content",
              borderRadius: "4px",
            }}
          >
            <Typography
              sx={{
                fontSize: "34px",
                lineHeight: "1",
                backgroundColor: "#4c6b22",
                padding: "2px",
                color: "#BDED11",
                borderRadius: "4px 0 0 4px",
              }}
              variant="p"
              component="p"
            >
              -{percent}%
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                right: "3.5%",
                fontSize: "12px",
                bottom: "17px",
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
