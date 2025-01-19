const jwt = require('jsonwebtoken')
const brcypt = require('bcryptjs')
const NGO = require('../models/ngoSchema')
const { logApi } = require('../utils')
const Contact=require('../models/contactSchema')
const RaiseFundsNGO = require('../models/raiseFundsNGOSchema')

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

        let user;
        if (loginFor == "ngo") {
            user = await NGO.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "NGO does not exist." });
            }
            
        } else if (loginFor == "donor") {
            // TODO
        }

        const passMatch = await user.matchPassword(password);

        if (!passMatch) {
            return res.status(400).json({ message: "Email/Password is incorrect." })
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

        return res.status(200).json({ token });

    } catch (error) {
        logApi(req, 500, error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.contact=async(req,res)=>{
    try {
        const {name,email,message}=req.body

        const newContact= new Contact({
            name,
            email,
            message,
        })

        await newContact.save()

        return res.status(201).json({message:"ThankYou for Contacting us"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

exports.addCampaign = async (req, res) => {
    try {
 
        // const token = req.headers.authorization?.split(' ')[1];

        const token=req.cookies.jwt;

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
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

