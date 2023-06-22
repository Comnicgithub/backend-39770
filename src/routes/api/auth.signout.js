import { Router } from "express"

const router = Router()

router.post("/signout", async(req, res, next) => {
    if (!req.session || !req.session.mail) {
        return res.status(401).json({success: false, message: "Not authorized"});
    }
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({success: false, message: "Unexpected error"});
        }
        return res.status(200).json({success: true, message: "successfully signout"})
    });
});


export default router