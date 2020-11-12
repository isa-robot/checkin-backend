import { Router } from 'express'
import CsvRegisterController from "@users/csvRegister/api/controllers/CsvRegisterController";
import multer from 'multer'
import KeycloakConfig from "@shared/keycloak/keycloak-config";

const upload = multer({dest: __dirname + '/../uploads'})
;
const keycloak = KeycloakConfig.getKeycloak()

const csvRegister = Router()
const uploadedFiles = upload.fields([{name: 'usersCsv'}])
csvRegister.post("/", keycloak.protect("realm:admin"), uploadedFiles, CsvRegisterController.create)

export default csvRegister;


