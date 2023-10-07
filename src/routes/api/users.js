import {
    Router
} from "express"
import Users from "../../dao/mongo/models/user.model.js"
import authorization from "../../middlewares/authorization.js";
import nodemailer from "nodemailer";
import sendMail from "../../utils/sendMail.js"
import {config} from '../../config/config.js'

import jwt from "jsonwebtoken"

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmail_user_app,
        pass: config.gmail_pass_app,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const router = Router()

// Ruta GET para obtener solo nombre, email y role de todos los usuarios
router.get('/', async (req, res, next) => {
    try {
        const users = await Users.find({}, 'first_name mail role').lean();
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.delete('/', async (req, res) => {
    try {
        // Obtén la lista de usuarios de tu base de datos
        const users = await Users.find();

        // Calcula la fecha límite de inactividad (2 días atrás en este caso)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 2);

        // Filtra los usuarios inactivos
        const inactiveUsers = users.filter((user) => user.last_connection < cutoffDate);

        // Envía un correo a los usuarios inactivos y elimínalos
        for (const user of inactiveUsers) {
            try {
                // Envía un correo electrónico al usuario
                const mailOptions = {
                    from: 'lopeznicolas055@gmail.com',
                    to: user.mail,
                    subject: 'Eliminación por inactividad',
                    text: 'Tu cuenta ha sido eliminada debido a la inactividad durante 2 días.',
                };

                await transport.sendMail(mailOptions);

                // Elimina al usuario de la base de datos
                await Users.findByIdAndRemove(user._id);
            } catch (error) {
                console.error(`Error al enviar el correo a ${user.mail}: ${error}`);
            }
        }

        res.status(200).json({
            message: 'Usuarios inactivos eliminados y notificados.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Ocurrió un error al procesar la solicitud.'
        });
    }
});

router.get("/premium/:uid", async (req, res, next) => {
    try {

        const {
            uid
        } = req.params

        const mongouser = await Users.findById(uid)

        console.log(mongouser)
        if (req.user.role != "admin") return res.status(401).json({
            success: false,
            message: "unauthorized"
        })

        if (mongouser == null) return res.status(404).json({
            success: false,
            message: "user not found"
        })

        if (mongouser.role == "admin") return res.json(401).json({
            success: false,
            message: "cant change admin privileges"
        })

        mongouser.role = mongouser.role == "user" ? "premium" : "user"

        await mongouser.save()

        res.status(200).json({
            success: true,
            message: `user role changed to ${mongouser.role}`
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.post("/:uid/documents", async (req, res, next) => {

})





export default router