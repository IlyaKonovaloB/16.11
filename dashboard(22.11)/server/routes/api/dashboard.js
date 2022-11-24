const express = require("express");
const router = express.Router();
const { handleRefreshToken } = require("../controllers/refreshTokenController");
const app = express();

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./", "client", "build", "index.html")); 
});

router.get("/", handleRefreshToken);

module.exports = router;