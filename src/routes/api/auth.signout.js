import { Router } from "express"

const router = Router()

router.post("/", async(req, res, next) => {
    console.log("signout pa")
    if (!req.session || !req.session.mail) {
        return res.status(401).json({success: false, message: "Not authorized"});
    }
    req.session.destroy(err => {
        console.log("ERR", err)
        if (err) {
            return res.status(500).json({success: false, message: "Unexpected error"});
        }
        return res.redirect("/perfil");
    });
});


export default router