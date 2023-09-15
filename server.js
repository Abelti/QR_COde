const express = require("express");
const bodyParser = require("body-parser");
const qrcode = require("qrcode");

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.post("/qrcode", (req, res) => {
  const url = req.body.url;
  console.log(url);
  if (url) {
    qrcode.toDataURL(url, (err, src) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      let file_path = Date.now().toString() + ".png";
      qrcode.toFile(file_path, url, {
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      res.sendFile(file_path);
    });
  }
  else {
    res.send(404);
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
