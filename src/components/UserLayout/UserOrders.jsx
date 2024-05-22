import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";

export default function UserOrders() {
  const { orders, library, loading } = useSelector((state) => state.orders);
  orders.map((item) => console.log(item));
  // const product = library.map((item) => item.map((el) => el._id));

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h4"
          component="h4"
          sx={{ fontWeight: "700", marginBottom: "15px" }}
        >
          My profile
        </Typography>
        {orders.map((item) => (
          <Accordion
            key={item._id}
            sx={{
              // width: "60%",
              boxShadow: 5,
              borderRadius: 2,
              marginBottom: "25px",
              padding: "10px",
              // display: "flex",
              backgroundColor: "transparent",
              "&::before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              {item.orderNo}
            </AccordionSummary>
            {item.products.map((el) => (
              <AccordionDetails
                key={el.product._id}
                sx={{
                  display: "flex",
                  borderBottom: "1px solid #cccc",
                  p: "15px",
                }}
              >
                <CardMedia
                  sx={{
                    height: "100px",
                    width: "300px",
                    objectFit: "cover",
                    borderRadius: "6px 0px 0px 6px",
                  }}
                  image={el.product.imageUrls[0]}
                  title={el.product._id}
                />
                <CardContent
                  sx={{
                    width: "100%",
                    minHeight: 83,
                    padding: "0px 0px 0px 16px ",
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    "&:last-child": { pb: 0 },
                  }}
                >
                  <Box>
                    <Link className="post__more" to={`/product/${item._id}`}>
                      <Typography
                        sx={{ textTransform: "capitalize" }}
                        variant="h5"
                        component="h5"
                      >
                        {el.product.name}
                      </Typography>
                      <Typography
                        sx={{ textTransform: "capitalize", fontSize: "14px" }}
                        variant="p"
                        component="p"
                      >
                        Publisher: {el.product.publisher}
                      </Typography>
                      <Typography
                        sx={{ textTransform: "capitalize", fontSize: "14px" }}
                        variant="p"
                        component="p"
                      >
                        Developer: {el.product.developer}
                      </Typography>
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      width: "120px",
                    }}
                  >
                    {el.product.previousPrice ? (
                      <Box
                        sx={{
                          display: "flex",
                          gap: "11px",
                          alignItems: "baseline",
                          position: "relative",
                          paddingRight: "4px",
                          backgroundColor: "#cccc",
                          width: "fit-content",
                          borderRadius: "4px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "24px",
                            lineHeight: "1",
                            backgroundColor: "#4c6b22",
                            padding: "6px 3px 3px",
                            color: "#BDED11",
                            borderRadius: "4px 0 0 4px",
                          }}
                          variant="p"
                          component="p"
                        >
                          -
                          {el.product.previousPrice
                            ? Math.floor(
                                (el.product.currentPrice * 100) /
                                  el.product.previousPrice
                              )
                            : null}
                          %
                        </Typography>
                        <Typography
                          sx={{
                            position: "absolute",
                            right: "4.5%",
                            fontSize: "12px",
                            bottom: "16px",
                            color: "#647984",
                            textDecorationLine: "line-through",
                          }}
                          variant="p"
                          component="p"
                        >
                          {el.product.previousPrice}$
                        </Typography>
                        <Typography
                          sx={{
                            color: "#4c6b22",
                          }}
                          variant="p"
                          component="p"
                        >
                          {el.product.currentPrice}$
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "23px",
                          textAlign: "center",
                          backgroundColor: "#cccc",
                          borderRadius: "4px",
                        }}
                        variant="p"
                        component="p"
                      >
                        {el.product.currentPrice}$
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </Box>
    </>
  );
}
