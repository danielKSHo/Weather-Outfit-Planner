const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001; // Use any available port

app.use(express.json());


app.get('/fetch-images', async (req, res) => {
  try {
    const { data } = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_images',
        q: req.query.searchQuery,
        api_key: 'ad0139fb8f45b03cc2d5b4468ddf04e20fd2705a8984dccdad2be1aa92a30a6c',
      },
    });
    res.json(data.images_results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching images');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

