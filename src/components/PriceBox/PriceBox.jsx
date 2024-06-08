import { Box, Typography, Button } from "@mui/material";

const PriceBox = ({
  previousPrice,
  currentPrice,
  onCart,
  handleCartList,
  productId,
  loggedIn,
  showButton = true,
  sliderItem = false,
  additionalStyles = {},
  position = "relative",
  alignItems = "center",
  display = "flex",
  justifyContent = "space-between",
  buttonWidth = "105px",
  buttonPadding = "5px 12px",
}) => {
  const percent = previousPrice
    ? Math.floor((currentPrice * 100) / previousPrice - 100)
    : null;

  return (
    <Box
      sx={{
        display,
        alignItems: previousPrice ? "flex-end" : alignItems,
        backgroundColor: "#cccc",
        justifyContent,
        padding: "3px 3px 3px 10px",
        borderRadius: "3px",
        gap: "7px",
        position,
        ...additionalStyles,
      }}
    >
      {previousPrice ? (
        <>
          <Typography
            sx={{
              fontSize: { xs: "10px", md: sliderItem ? "30px" : "24px" },
              lineHeight: "1",
              backgroundColor: "#4c6b22",
              padding: {
                xs: "6.25px 3px",
                md: sliderItem ? "4px" : "8.25px 3px",
              },
              color: "#BDED11",
              position: sliderItem ? "none" : "absolute",
              top: "0px",
              left: position === "relative" ? "-39%" : "unset",
              right: position !== "relative" ? "96%" : "unset",
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
              left: showButton && "14px",
              right: "5px",
              fontSize: { xs: "6px", md: "12px" },
              bottom: { xs: "12px", md: "18px" },
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
              fontSize: { xs: "9px", md: "16px" },
            }}
            variant="p"
            component="p"
          >
            {currentPrice}$
          </Typography>
        </>
      ) : (
        <Typography
          variant="p"
          component="p"
          sx={{
            fontSize: { xs: "12px", md: "16px" },
          }}
        >
          {currentPrice}$
        </Typography>
      )}
      {showButton && (
        <Button
          disabled={!loggedIn}
          onClick={() => handleCartList(productId)}
          sx={{
            width: buttonWidth,
            padding: buttonPadding,
            textTransform: "initial",
            backgroundColor: "#bdbdbd",
            borderRadius: "3px",
          }}
        >
          {onCart ? "In cart" : "Add to cart"}
        </Button>
      )}
    </Box>
  );
};

export default PriceBox;
