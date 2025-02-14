require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const { registerNGO, login, contact, addCampaign, getCampaigns, updateCampaign, checkLogin, uploadMiddleware } = require('./controllers/authController');

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI;
if (!DB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env file.');
    process.exit(1);
}


const app = express();


app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173']; // Add more origins if needed
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

app.post("/ngo/register", registerNGO);
app.post("/login", login);
app.post("/contact", contact);
app.post("/addcampaign",uploadMiddleware, addCampaign);
app.get("/getcampaigns", getCampaigns); 
app.put("/updatecampaign/:id", updateCampaign); 
app.get("/ngo/check-login",checkLogin)


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
