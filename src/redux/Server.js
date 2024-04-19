const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
