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
  categoryItem = false,
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
              fontSize: categoryItem
                ? {
                    xs: "10px",
                  }
                : sliderItem
                ? "30px"
                : "24px",
              lineHeight: "1",
              backgroundColor: "#4c6b22",
              padding: categoryItem
                ? {
                    xs: "6.25px 3px",
                  }
                : sliderItem
                ? "4px"
                : "8.25px 3px",
              color: "#BDED11",
              position: sliderItem ? "none" : "absolute",
              top: "0px",
              left: {
                xs: !categoryItem && "-51%",
                md: position === "relative" ? "-39%" : "unset",
              },
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
              fontSize: categoryItem ? { xs: "6px", md: "12px" } : "12px",
              bottom: categoryItem ? { xs: "12px", md: "18px" } : "18px",
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
              fontSize: categoryItem && { xs: "9px", md: "16px" },
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
            fontSize: categoryItem && { xs: "10px", md: "16px" },
            margin: categoryItem && { xs: "4px 10px 0 0 ", md: "0" },
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
            width: { xs: "auto", md: buttonWidth },
            padding: { xs: "5px 0", md: buttonPadding },
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
