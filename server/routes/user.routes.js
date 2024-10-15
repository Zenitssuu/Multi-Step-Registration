import { Router } from "express";
import { getUser, signIn, singUp, updateUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { jwtParse } from "../middlewares/auth.js";

const router = Router();


router.post("/signup",upload.single("profileImage"),singUp);
router.post('/login',signIn);
router.get('/getUser',jwtParse,getUser);
router.put('/updateUser',upload.single("profileImage"),jwtParse,updateUser);



export default router;