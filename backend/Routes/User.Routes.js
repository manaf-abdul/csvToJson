import  express  from "express";
const router=express.Router()
import {csvToJson, deleteUser, editUser, getAllUsers, register, saveToDb} from '../Controllers/User.Controller.js'
import { upload } from "../middleware/Multer.js";

router.post("/register", register)
router.post("/edit", editUser)
router.post("/parse-file",upload.single('file'), csvToJson)
router.post("/save-to-db", saveToDb)
router.post("/get-all-users", getAllUsers)
router.delete("/:id", deleteUser)

export default router