const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const NGO = require('../models/ngoSchema');
const Contact = require('../models/contactSchema');
const RaiseFundsNGO = require('../models/raiseFundsNGOSchema');
const { logApi } = require('../utils');
require('dotenv').config();

exports.registerNGO = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const ngoExist = await NGO.findOne({ email });
        if (ngoExist) {
            return res.status(400).json({ message: "NGO already exists with the email." });
        };
        const newNGO = new NGO({
            name,
            email,
            password
        });
        await newNGO.save();
        return res.status(201).json({ message: "NGO registered successfully." });
    } catch (error) {
        // console.error(`${req.originalUrl}->${error.message}`)
        logApi(req, 500, error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginFor = req.query.loginFor;

        if (!email || !password || !loginFor) {
            return res.status(400).json({ message: "Email, password, and login type are required." });
        }

        let user;
        if (loginFor === "ngo") {
            user = await NGO.findOne({ email: email.trim().toLowerCase() });
            if (!user) {
                return res.status(404).json({ message: "NGO does not exist." });
            }
        } else if (loginFor === "donor") {
            // TODO
        } else {
            return res.status(400).json({ message: "Invalid login type." });
        }

        const passMatch = await user.matchPassword(password);
        if (!passMatch) {
            return res.status(400).json({ message: "Email or Password is incorrect." });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ token, message: "Login successful!" });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.checkLogin = async (req, res) => {
    try {
      const token = req.cookies.jwt;
  
      if (!token) {
        return res.status(401).json({ message: "Not logged in" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await NGO.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ id: user._id, name: user.name, email: user.email });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message,
        });

        await newContact.save();

        return res.status(201).json({ message: "Thank you for contacting us!" });
    } catch (error) {
        logApi(req, 500, error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.addCampaign = async (req, res) => {
    try {
        const token = req.cookies.jwt; 

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ngoId = decoded.id;

        const ngo = await NGO.findById(ngoId);
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found.' });
        }

        const { title, cause, targetFunds, heroImage, images } = req.body;

        const newCampaign = await RaiseFundsNGO.create({
            title,
            cause,
            targetFunds,
            heroImage,
            images,
            ngoId, 
        });

        return res.status(201).json({ message: 'Campaign added successfully!', campaign: newCampaign });
    } catch (error) {
        logApi(req, 500, error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ngoId = decoded.id;

        const campaigns = await RaiseFundsNGO.find({ ngoId });

        return res.status(200).json(campaigns);
    } catch (error) {
        logApi(req, 500, error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ngoId = decoded.id;

        const { id } = req.params;
        const { title, cause, targetFunds, heroImage, images } = req.body;

        const campaign = await RaiseFundsNGO.findOne({ _id: id, ngoId });
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found or unauthorized.' });
        }

        campaign.title = title || campaign.title;
        campaign.cause = cause || campaign.cause;
        campaign.targetFunds = targetFunds || campaign.targetFunds;
        campaign.heroImage = heroImage || campaign.heroImage;
        campaign.images = images || campaign.images;

        const updatedCampaign = await campaign.save();

        return res.status(200).json({ message: 'Campaign updated successfully!', campaign: updatedCampaign });
    } catch (error) {
        logApi(req, 500, error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};