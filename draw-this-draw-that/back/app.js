const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 8080;

// array of players length = 2

//

// socket start playing

// socket to send draw

// disconnect
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
