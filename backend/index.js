require('dotenv').config();
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { registerNGO, login, contact, addCampaign } = require('./controllers/authController')
var bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db_uri = process.env.MONGODB_URI;

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.post("/ngo/register", registerNGO);
app.post("/login", login)
app.post("/contact",contact)
app.post("/addcampaign",addCampaign)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});