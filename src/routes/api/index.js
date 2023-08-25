import 'dotenv/config.js'
import { Router } from "express";
import carts_router from './carts.mongo.js';
import products_router from './products.mongo.js';
import auth_router from './auth.js';
import jwt from "jsonwebtoken"; // Import the jwt module only once
import nodemailer from "nodemailer";
import { generateUser, generateProduct } from "../../utils/mocks/generateUserFake.js";
import Users from "../../dao/mongo/models/user.model.js";
import { forgotPass } from '../../utils/sendMail.js';



const router = Router()
const secretKey = process.env.JWT_SECRET;


router.use('/products', products_router)
router.use('/carts', carts_router)
router.use('/auth', auth_router)

router.post("/forgot-password", (req, res) => {
    const { email } = req.body;

    // Find user by email in the database
    const user = Users.findOne({ email: email });
    if (!user) {
    return res.status(404).send("User not found");
    }

    // Generate a JWT token for password reset (expires in 1 hour)
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

    // Send the reset link to the user's email
    const resetLink = `http://localhost:${process.env.PORT}/reset-password?token=${token}`;
    const mailOptions = {
    from: process.env.GMAIL_USER_APP,
    to: user.email,
    subject: "Password Reset",
    html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        return res.status(500).send("Error sending email");
    }
    console.log("Email sent: " + info.response);
    res.send("Password reset email sent");
    });
});
    
router.get("/reset-password", (req, res) => {
        const token = req.query.token;
    
        // Verify the JWT token
        jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid or expired token");
        }
        console.log(token,secretKey)
        // Render the password reset form
        res.render("reset-password", { token });
        });
    });
    
router.post("/reset-password", (req, res) => {
        const token = req.body.token;
        const newPassword = req.body.newPassword;
    
        // Verify the JWT token
        jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid or expired token");
        }
        // Update user's password in the database
        const user = Users.find((user) => user.id === decoded.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
    
        user.password = newPassword;
    
        res.send("Password reset successful");
        });
    });
    


// Endpoint solo para pruebas, /api/mockU
router.get('/mockusers', (req,res)=>{
    const { limit } = req.query

    const users = []
    for(let i = 0; i < (limit||100); i++){
        users.push(generateUser())
    }

    return res.status(200).json({
        status:'success',
        payload: users
    })
})

// Endpoint solo para pruebas, /api/mockusers
router.get('/mockingproducts', (req,res) => {
    const { limit } = req.query

    const products = []
    for(let i = 0; i < (limit||100); i++){
        products.push(generateProduct())
    }

    return res.status(200).json({
        status:'success',
        payload: products
    })
})

router.get("/loggerTest", (req, res) => {
    req.logger.fatal("Fatal logger test 1")
    req.logger.error("Error logger test 2")
    req.logger.warning("Warning logger test 3")
    req.logger.info("Info logger test 4")
    req.logger.debug("Debug logger test 5")
    return res.status(201).json({
        success: true,
        message: "logs created!"
    })
})


router.put("/premium/:uid", (req, res) => {
    const uid = req.params.uid;

    // Busca el usuario por su id en la base de datos
    const user = Users.find((user) => user.id === uid);

    if (!user) {
        return res.status(404).send("User not found");
    }

    // Cambia el rol del usuario
    user.role = user.role === "user" ? "premium" : "user";

    res.send("User role updated successfully");
});


export default router