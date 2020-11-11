import { Router } from 'express'
import CsvRegisterController from "@users/csvRegister/api/controllers/CsvRegisterController";
import multer from 'multer'

const upload = multer({dest: '../uploads'})


const csvRegister = Router()
const uploadedFiles = upload.fields([{name: 'usersCsv'}])
csvRegister.post("/", uploadedFiles, CsvRegisterController.create)

export default csvRegister;


