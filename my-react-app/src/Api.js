const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3003;
const API_KEY = "AIzaSyC0Irgp6XwyZWJN1HTN1w7BLpxLk4eSg3w";

app.use(cors());

app.get("/api/song", async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: q,
          key: API_KEY,
        },
      }
    );

    const videoId = response.data.items[0].id.videoId;
    const snippet = response.data.items[0].snippet;
    res.json({
      title: snippet.title,
      artist: snippet.channelTitle,
      thumbnailUrl: snippet.thumbnails.default.url,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    });
  } catch (error) {
    console.error("Erro ao buscar música:", error);
    res.status(500).json({ error: "Falha ao buscar música" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
