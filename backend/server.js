const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./src/routes/weatherRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', weatherRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).send("OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
