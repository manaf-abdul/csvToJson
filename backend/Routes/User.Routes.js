import  express  from "express";
const router=express.Router()
import {csvToJson, deleteUser, editUser, getAllUsers, register} from '../Controllers/User.Controller.js'
import { upload } from "../middleware/Multer.js";

router.post("/register", register)
router.post("/edit", editUser)
router.post("/parse-file",upload.single('file'), csvToJson)
router.get("/", getAllUsers)
router.delete("/:id", deleteUser)

export default router