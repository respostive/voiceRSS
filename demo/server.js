const express = require("express");
const app = express();
const port = 3000;

// Sử dụng dynamic import() để load node-fetch
(async () => {
  const fetch = (await import("node-fetch")).default;

  app.use(express.static("public"));
  app.use(express.json());

  const apiKey = "dc34e6febedf4aab9d6e7c194c272302"; // Thay thế bằng API Key từ Voicerss

  app.post("/speak", async (req, res) => {
    const text = req.body.text;
    const url = `https://api.voicerss.org/?key=${apiKey}&hl=vi-vn&src=${encodeURIComponent(
      text
    )}&c=MP3&f=44khz_16bit_stereo`;

    try {
      const response = await fetch(url);
      const audioBuffer = await response.arrayBuffer();
      res.set("Content-Type", "audio/mpeg");
      res.send(Buffer.from(audioBuffer));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Lỗi trong quá trình xử lý giọng đọc.");
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();
