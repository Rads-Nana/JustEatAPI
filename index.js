const express = require("express");
const app = express();
const https = require("https");

const PORT = 443;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});